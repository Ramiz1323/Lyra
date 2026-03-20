import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import SourceCard from './SourceCard';
import './MessageItem.scss';

const MessageItem = ({ role, content, sources, timestamp }) => {
  const { user } = useSelector(state => state.auth);
  const isAI = role === 'ai';

  return (
    <div className={`message-item ${role}`}>
      <div className="message-container">
        
        {/* User Message */}
        {role === 'user' && (
          <div className="user-message-wrapper">
            <div className="user-content">
              <div className="content-bubble">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
              <div className="message-meta">
                {timestamp}
              </div>
            </div>
            <div className="user-avatar">
              <img 
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=00f2ff&color=000`} 
                alt="Avatar" 
              />
            </div>
          </div>
        )}

        {/* AI Message */}
        {isAI && (
          <div className="ai-message-wrapper">
            <header className="ai-header">
              <div className="header-main">
                <div className="ai-icon">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div className="ai-info">
                  <span className="ai-name">Lyra AI</span>
                  <span className="ai-badge">Synthesis</span>
                </div>
              </div>
              <div className="header-actions">
                <button className="icon-btn-sm" title="Copy Message">
                  <span className="material-symbols-outlined">content_copy</span>
                </button>
              </div>
            </header>

            <div className="ai-body">
              <div className="content-payload">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
              
              {sources && sources.length > 0 && (
                <div className="sources-container">
                  <div className="sources-label">
                    <span className="material-symbols-outlined">verified_user</span>
                    CITATIONS & SOURCES
                  </div>
                  <div className="sources-scroll">
                    {sources.map((source, idx) => (
                      <SourceCard key={idx} {...source} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <footer className="ai-footer">
              <div className="feedback-group">
                <button className="feedback-btn" title="Helpful">
                  <span className="material-symbols-outlined">thumb_up</span>
                </button>
                <button className="feedback-btn" title="Not Helpful">
                  <span className="material-symbols-outlined">thumb_down</span>
                </button>
              </div>
              <div className="timestamp-group">
                <span className="material-symbols-outlined">history</span>
                {timestamp || 'Just now'}
              </div>
            </footer>
          </div>
        )}

      </div>
    </div>
  );
};

export default MessageItem;
