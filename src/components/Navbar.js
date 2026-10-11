import React from 'react';

const Navbar = ({ items, activeMenu, activePage, onMenuChange, onPageChange }) => {
  const currentMenuPages = items.find((item) => item.key === activeMenu)?.pages || {};

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-primary">
        <div className="nav-menu">
          {items.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeMenu === item.key ? 'active' : ''}`}
              onClick={() => onMenuChange(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
        <button className="exit-btn">🚪 Exit</button>
      </div>

      {Object.keys(currentMenuPages).length > 0 && (
        <div className="dropdown-area">
          <div className="dropdown-content">
            {Object.entries(currentMenuPages).map(([key, page]) => (
              <button
                key={key}
                className={`dropdown-item ${activePage === key ? 'active' : ''}`}
                onClick={() => onPageChange(key)}
              >
                {page.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
