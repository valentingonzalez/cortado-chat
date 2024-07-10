import React from 'react';
import Chat from './components/Chat';
import ChatHeader from './components/ChatHeader';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <ChatHeader />
        <Chat />
      </div>
    </div>
  );
};

export default App;
