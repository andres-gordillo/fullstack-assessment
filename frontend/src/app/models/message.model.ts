export interface Message {
    _id?: string;
    phone_number: string;
    session_id?: string;
    twilio_id?: string;
    message_content: string;
    status: 'pending' | 'sent' | 'failed';
    created_at: string;
    updated_at: string;
}

export interface CreateMessageResponse {
    message: {
        message_content: string;
        phone_number: string;
    }
}

export interface MessageResponse {
    messages: Message[];
    pagination: {
        current_page: number;
        per_page: number;
        total_count: number;
        total_pages: number;
    };
}