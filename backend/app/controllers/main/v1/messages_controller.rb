class Main::V1::MessagesController < ApplicationController

    
    def index 
        @messages = Message.where(session_id: session_id).order(created_at: :desc)
        render json: @messages
    end

    def create
        @message = Message.new(message_params.merge(session_id: session_id))

        if message.save 
            send_sms_results = send_sms(@message)
        end
    end

end
