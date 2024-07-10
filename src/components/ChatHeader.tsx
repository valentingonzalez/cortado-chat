import React from 'react';
import { useDispatch } from 'react-redux';
import { clearMessages } from '../store/slices/chatSlice';
import './ChatHeader.scss';

const ChatHeader: React.FC = () => {
  const dispatch = useDispatch();

  const handleClearChat = () => {
    dispatch(clearMessages());
  };

  return (
    <div className="display-properties bg-dark">
      <button className="btn btn-secondary btn-sm" onClick={handleClearChat}>Clear Chat</button>
      {/* Add more display property controls here */}
    </div>
  );
};

export default ChatHeader;
