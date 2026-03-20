import { useNavigate, useLocation } from 'react-router-dom';
import { useChat } from '@features/chat/hooks/useChat';
import './BottomNav.scss';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleNewChat, handleToggleSidebar } = useChat();

  const onNavClick = (item) => {
    if (item.path === '/chat' && location.pathname === '/chat') {
      handleToggleSidebar();
    } else if (item.path !== '#') {
      navigate(item.path);
    }
  };

  const navItems = [
    { icon: '🔍', label: 'Search', path: '/', active: location.pathname === '/' },
    { icon: '🕒', label: 'History', path: '/chat', active: location.pathname === '/chat' },
    { icon: '📚', label: 'Library', path: '#', active: false },
    { icon: '⚙️', label: 'Settings', path: '#', active: false },
  ];

  return (
    <nav className="bottom-nav">
      <div className="nav-items-left">
        {navItems.slice(0, 2).map((item, i) => (
          <div 
            key={i} 
            className={`nav-item ${item.active ? 'active' : ''}`}
            onClick={() => onNavClick(item)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="fab-container">
        <button className="fab" onClick={handleNewChat}>
          <span className="plus">+</span>
        </button>
      </div>

      <div className="nav-items-right">
        {navItems.slice(2).map((item, i) => (
          <div 
            key={i} 
            className={`nav-item ${item.active ? 'active' : ''}`}
            onClick={() => onNavClick(item)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
