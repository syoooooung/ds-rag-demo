import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import './styles/App.css';

/**
 * App 컴포넌트
 * DS-RAG 데모 애플리케이션의 루트 컴포넌트
 */
function App() {
  const [activeNav, setActiveNav] = useState(0);

  // SVG Icons
  const icons = {
    chat: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    grid: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    list: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
    settings: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    share: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="app-sidebar">
        {/* Logo */}
        <div className="sidebar-logo">
          <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>

        {/* Navigation Icons */}
        <button
          className={`sidebar-icon ${activeNav === 0 ? 'active' : ''}`}
          onClick={() => setActiveNav(0)}
        >
          {icons.chat}
        </button>
        <button
          className={`sidebar-icon ${activeNav === 1 ? 'active' : ''}`}
          onClick={() => setActiveNav(1)}
        >
          {icons.grid}
        </button>
        <button
          className={`sidebar-icon ${activeNav === 2 ? 'active' : ''}`}
          onClick={() => setActiveNav(2)}
        >
          {icons.list}
        </button>

        <div className="sidebar-spacer" />

        {/* Settings */}
        <button className="sidebar-icon">
          {icons.settings}
        </button>

        {/* User Avatar */}
        <div className="sidebar-avatar">
          D
          <span className="sidebar-avatar-status"/>
        </div>
      </aside>

      {/* Main Content */}
      <div className="app-main">
        {/* Header */}
        <header className="app-header">
          <span className="header-title">DS-RAG Framework</span>
          <span className="header-badge">Demo</span>
          <div className="header-spacer" />
          <a
            href="https://www.mdpi.com/2079-9292/14/4/659"
            target="_blank"
            rel="noopener noreferrer"
            className="header-btn"
          >
            📄 Paper
          </a>
          <button className="header-btn">
            {icons.share} Share
          </button>
          <button className="header-btn-primary">
            ✦ New Chat
          </button>
        </header>

        {/* Chat Interface */}
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;
