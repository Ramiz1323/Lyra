import React from 'react';
import './SourceCard.scss';

const SourceCard = ({ title, site, favicon, snippet, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="source-card">
      <div className="card-top">
        <span className="source-label">{title || 'Nature Physics'}</span>
      </div>
      <p className="source-snippet">{snippet || 'Comprehensive review of error correction models and topological qubits...'}</p>
      <div className="card-footer">
        <div className="site-info">
          <span className="dot"></span>
          <span className="site-name">{site || 'nature.com'}</span>
        </div>
      </div>
    </a>
  );
};

export default SourceCard;
