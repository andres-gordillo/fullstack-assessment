class Main::V1::MessagesController < ApplicationController
    before_action :initialize_session
    before_action :confirm_session_id

    def index 
        @messages = Message.where(session_id: session_id).order(created_at: :desc)
        render json: @messages
    end

    def create
        @message = Message.new(message_params.merge(session_id: session_id))

        if @message.save 
            send_sms_results = twilio_helper(@message)

            if(send_sms_results[:success])
                @message.update(
                    twilio_sid: send_sms_results[:sid],
                    status: 'sent'
                )
                render json: @message, status: :created
            else
                @message.update(status: 'failed')
                render json: {
                    errors: ["sending failed: #{send_sms_results[:error]}"]
                }, status: :unprocessable_entity
            end
        else
            render json: {errors: @message.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def initialize_session
        session[:initialized] ||= Time.current.to_i
        session[:last_activity] = Time.current
    end

    def confirm_session_id
        # Optional: Keep minimal logging if you want to monitor sessions
        # Used to debug cookie and session id issue.
        Rails.logger.info "Session ID: #{session.id}" if Rails.env.development?
    end

    def session_id
        session.id
    end

    def message_params
        params.require(:message).permit(:message_content, :phone_number)
    end

    def twilio_helper(message)
        begin
          twilio_base = Twilio::REST::Client.new(
            ENV['TWILIO_ACCOUNT_SID'],
            ENV['TWILIO_AUTH_TOKEN']
          )

          twilio_message = twilio_base.messages.create(
            from: ENV['TWILIO_PHONE_NUMBER'],
            to: message.phone_number,
            body: message.message_content
          )

          { success: true, sid: twilio_message.sid}
        rescue Twilio::REST::RestError => e
            { success: false, error: e.message}
        rescue => e
            { success: false, error: e.message} 
        end
    end
end