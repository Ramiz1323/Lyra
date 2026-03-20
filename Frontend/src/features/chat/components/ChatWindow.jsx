import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './ChatWindow.scss';
import MessageItem from './MessageItem';
import ChatInput from './ChatInput';

import { useChat } from '@features/chat/hooks/useChat';

const ChatWindow = ({ messages = [], onSendMessage, loading, threadTitle }) => {
  const { user } = useSelector(state => state.auth);
  const { handleToggleSidebar } = useChat();
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-window">
      {/* Top Header */}
      <header className="chat-header">
        <div className="header-left">
          <span className="lyra-badge">LYRA AI</span>
          <span className="divider">|</span>
          <h2 className="thread-title">{threadTitle || 'New Discovery'}</h2>
        </div>
        
        <div className="header-right">
          <button className="icon-btn" onClick={() => alert('Notifications coming soon!')}>
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="icon-btn" onClick={handleToggleSidebar}>
            <span className="material-symbols-outlined">history</span>
          </button>
          <div className="user-profile">
            <div className="profile-info">
              <span className="user-name">{user?.username || 'Explorer'}</span>
              <span className="pro-tag">Pro Member</span>
            </div>
            <div className="avatar">
              <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=00f2ff&color=000`} alt="Profile" />
            </div>
          </div>
        </div>
      </header>

      {/* Message Area */}
      <main className="chat-messages" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="glow-logo">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <h3>What can Lyra help you achieve today?</h3>
            <p>Synthesize the web, generate code, or explore deep research.</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((msg, idx) => (
              <MessageItem key={idx} {...msg} />
            ))}
            {loading && (
              <div className="ai-loading">
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
                <span className="loading-text">Synthesizing response...</span>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer / Input Area */}
      <footer className="chat-footer">
        <ChatInput onSendMessage={onSendMessage} loading={loading} />
      </footer>
    </div>
  );
};

export default ChatWindow;
