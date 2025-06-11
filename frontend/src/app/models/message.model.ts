export interface Message {
    _id?: string;
    phone_number: string;
    session_id?: string;
    twilio_id?: string;
    messageContent: string;
    status: 'pending' | 'sent' | 'failed';
    created_at: string;
    updated_at: string;
}

export interface CreateMessageResponse {
    messageContent: string;
    phone_number: string;
}