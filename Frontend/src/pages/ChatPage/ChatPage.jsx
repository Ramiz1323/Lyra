import React, { useEffect } from 'react';
import Sidebar from '@components/layout/Sidebar';
import MobileNav from '@components/layout/MobileNav';
import ChatWindow from '@features/chat/components/ChatWindow';
import './ChatPage.scss';
import { useChat } from '@features/chat/hooks/useChat';

const ChatPage = () => {
  const { 
    currentChat, 
    handleSendMessage, 
    isLoading 
  } = useChat();

  const onSendMessage = (content) => {
    handleSendMessage({ message: content, chatId: currentChat?._id });
  };

  return (
    <div className="chat-page-layout">
      <Sidebar />
      <div className="chat-main-container">
        <ChatWindow 
          messages={currentChat.messages} 
          onSendMessage={onSendMessage} 
          loading={isLoading}
          threadTitle={currentChat.title}
        />
      </div>
      <MobileNav />
    </div>
  );
};

export default ChatPage;
