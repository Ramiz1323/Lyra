import React, { useState } from 'react';
import './ChatInput.scss';

const ChatInput = ({ onSendMessage, loading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message.trim() && !loading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-container">
      <form className="chat-input-glass" onSubmit={handleSubmit}>
        <button type="button" className="action-btn attach-btn">
          <span className="material-symbols-outlined">add</span>
        </button>

        <textarea
          placeholder="Ask Lyra anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          rows={1}
        />

        <div className="input-actions">
          <div className="model-selector">
            <span className="dot"></span>
            <span className="model-name">Gemini 2.0 Flash</span>
          </div>

          <button type="submit" className={`send-btn ${message.trim() ? 'active' : ''}`} disabled={loading || !message.trim()}>
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        </div>
      </form>
      
      <div className="input-hint">
        <span className="hint-item"><b>SHIFT + ENTER</b> FOR NEW LINE</span>
        <span className="hint-divider"></span>
        <span className="hint-item"><b>CTRL + K</b> TO CLEAR</span>
      </div>
    </div>
  );
};

export default ChatInput;
