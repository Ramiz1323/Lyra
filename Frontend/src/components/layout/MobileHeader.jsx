import { useNavigate } from 'react-router-dom';
import { useChat } from '@features/chat/hooks/useChat';
import './MobileHeader.scss';

const MobileHeader = () => {
  const navigate = useNavigate();
  const { handleToggleSidebar } = useChat();

  return (
    <header className="mobile-header">
      <button className="menu-btn" onClick={handleToggleSidebar}>
        <div className="hamburger"></div>
      </button>
      <span className="mobile-logo" onClick={() => navigate('/')}>Lyra AI</span>
      <div className="header-actions">
        <div className="profile-icon">👤</div>
        <button className="power-btn">⚡</button>
      </div>
    </header>
  );
};

export default MobileHeader;
