import React from 'react';
import './Sidebar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChat } from '@features/chat/hooks/useChat';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { 
    currentChatId, 
    handleGetMessages, 
    handleDeleteChat, 
    handleNewChat,
    sortedChats: recentChats,
    isSidebarOpen,
    handleSetSidebarOpen
  } = useChat();

  const menuItems = [
    { icon: 'home', label: 'Home', path: '/', active: location.pathname === '/' },
    { icon: 'chat_bubble', label: 'Threads', path: '/chat', active: location.pathname === '/chat' },
    { icon: 'explore', label: 'Discovery', path: '#', active: false },
    { icon: 'library_books', label: 'Library', path: '#', active: false },
  ];

  const onChatSelect = (chatId) => {
    handleGetMessages(chatId);
  };

  const onDeleteChat = (e, chatId) => {
    e.stopPropagation();
    handleDeleteChat(chatId);
  };

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => handleSetSidebarOpen(false)}
        />
      )}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button 
          className="close-sidebar-btn" 
          onClick={() => handleSetSidebarOpen(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="sidebar-brand">
          <div className="brand-logo">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <div className="brand-info">
            <h1 className="brand-name">Lyra AI</h1>
            <span className="brand-subtitle">AI SEARCH ENGINE</span>
          </div>
        </div>

      <button className="new-chat-btn" onClick={handleNewChat}>
        <span className="material-symbols-outlined">add</span>
        New Chat
      </button>

      <nav className="sidebar-nav">
        <div className="nav-group">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`nav-item ${item.active ? 'active' : ''}`}
              onClick={() => item.path !== '#' && navigate(item.path)}
              style={{ cursor: item.path === '#' ? 'default' : 'pointer' }}
            >
              <span className="material-symbols-outlined nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </div>

        {location.pathname === '/chat' && recentChats.length > 0 && (
          <div className="nav-group recent-threads">
            <div className="group-label">RECENT THREADS</div>
            {recentChats.map((chat) => (
              <div 
                key={chat._id} 
                className={`nav-item thread-item ${currentChatId === chat._id ? 'active' : ''}`}
                onClick={() => onChatSelect(chat._id)}
              >
                <span className="material-symbols-outlined nav-icon">chat_bubble</span>
                <span className="nav-label">{chat.title || 'Untitled Chat'}</span>
                <button 
                  className="delete-thread-btn"
                  onClick={(e) => onDeleteChat(e, chat._id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">
            <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=00f2ff&color=000`} alt="User" />
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Explorer'}</span>
            <span className="user-status">Pro Member</span>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
