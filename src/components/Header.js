import React from 'react';

const Header = ({ companyName }) => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">📊</div>
        <div className="header-info">
          <h1 className="app-title">Tally Elite</h1>
          <p className="company-name">{companyName}</p>
        </div>
      </div>
      <div className="header-right">
        <span className="current-date">{currentDate}</span>
        <div className="user-badge">👤 manoj</div>
      </div>
    </header>
  );
};

export default Header;
