import React from 'react';
import './Message.scss';

interface MessageProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'bot';
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={`message ${message.sender}`}>
      <span>{message.text}</span>
    </div>
  );
};

export default Message;
