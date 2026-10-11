import React from 'react';

const Footer = ({ userName, companyName, lastSavedAt }) => {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        <span>👤 {userName}</span>
        <span>•</span>
        <span>{companyName}</span>
      </div>
      <div className="footer-center">
        <span>Last saved: {lastSavedAt || 'Not saved yet'}</span>
      </div>
      <div className="footer-right">
        <span>© 2026 Tally Elite. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
