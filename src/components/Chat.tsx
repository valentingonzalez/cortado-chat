import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addMessage, updateMessage } from '../store/slices/chatSlice';
import { getLLMResponse } from '../services/llmService';
import { saveMessages, loadMessages } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';
import Message from './Message';
import './Chat.scss';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [botMessageId, setBotMessageId] = useState<string | null>(null);

  useEffect(() => {
    const loadedMessages = loadMessages();
    loadedMessages.forEach((message: any) => {
      dispatch(addMessage(message));
    });
  }, [dispatch]);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: uuidv4(), text: input, sender: 'user' };
    dispatch(addMessage(userMessage));
    setInput('');

    setIsSending(true);
    const botResponse = await getLLMResponse(input);
    setIsSending(false);
    const botMessageId = uuidv4();
    setBotMessageId(botMessageId);
    dispatch(addMessage({ id: botMessageId, text: '', sender: 'bot' }));
    simulateTyping(botResponse, botMessageId);
  };

  const simulateTyping = (text: string, id: string) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        const partialText = text.slice(0, index + 1);
        dispatch(updateMessage({ id, text: partialText }));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust the speed as needed
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-container d-flex flex-column bg-dark">
      <div className="messages flex-grow-1 overflow-auto p-3">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isSending && <Message key="typing" message={{ id: 'typing', text: '...', sender: 'bot' }} />}
      </div>
      <div className="input-container d-flex p-2 bg-primary">
        <input
          type="text"
          className="form-control me-2 bg-secondary border-secondary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary text-uppercase" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
