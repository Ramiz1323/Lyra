import { useNavigate, useLocation } from 'react-router-dom';
import { useChat } from '@features/chat/hooks/useChat';
import './MobileNav.scss';

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleToggleSidebar } = useChat();

  const onNavClick = (item) => {
    if (item.path === '/chat' && location.pathname === '/chat') {
      handleToggleSidebar();
    } else if (item.path !== '#') {
      navigate(item.path);
    }
  };

  const navItems = [
    { icon: 'home', label: 'HOME', path: '/', active: location.pathname === '/' },
    { icon: 'chat_bubble', label: 'THREADS', path: '/chat', active: location.pathname === '/chat' },
    { icon: 'explore', label: 'DISCOVER', path: '#', active: false },
    { icon: 'library_books', label: 'LIBRARY', path: '#', active: false },
  ];

  return (
    <nav className="mobile-nav">
      {navItems.map((item, index) => (
        <div 
          key={index} 
          className={`nav-item ${item.active ? 'active' : ''}`}
          onClick={() => onNavClick(item)}
        >
          <div className="icon-wrapper">
            <span className="material-symbols-outlined">{item.icon}</span>
          </div>
          <span className="nav-label">{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default MobileNav;
