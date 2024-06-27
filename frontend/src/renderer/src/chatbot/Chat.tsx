import React from 'react';

export interface Message {
  text: string;
  isUser: boolean;
}

export interface ChatProps {
  messages: Message[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;