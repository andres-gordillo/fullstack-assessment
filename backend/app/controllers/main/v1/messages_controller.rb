class Main::V1::MessagesController < ApplicationController
    before_action :confirm_session_id

    
    def index 
        @messages = Message.where(session_id: session_id).order(created_at: :desc)
        render json: @messages
    end

    def create
        @message = Message.new(message_params.merge(session_id: session_id))

        if message.save 
            send_sms_results = send_sms(@message)

            if(send_sms_results[:success])
                @message.update(
                    twilio_sid: send_sms_results[:sid],
                    status: 'sent'
                )
                render json: @message, status: created
            else
                @message.update(status: 'failed')
                render json: {
                    errors: ["sending failed: #{send_sms_results[:error]}"]
                }, status: :unprocessable_entity
            end
        else
            render json: {errors: @message.errors.full_messages}, status: unprocessable_entity
        end
    end

    def confirm_session_id
        session[:session_id] ||= SecureRandom.uuid
    end

    def session_id
        session[:session_id]
    end

    def params
        params.require(:message).permit(:messageContent, :phone_number)
    end


end
