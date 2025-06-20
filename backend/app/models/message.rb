class Message
  include Mongoid::Document
  include Mongoid::Timestamps

  # Fields used in message form and database. 
  field :message_content, type: String

  field :phone_number, type: String

  field :session_id, type: String

  field :twilio_sid, type: String

  field :status, type: String, default: 'pending'


  # Data validations for cleaner data.
  validates :message_content, presence: true, length: {maximum: 250}

  validates :phone_number, presence: true

  validates :session_id, presence: true



  index({session_id: 1})
end
