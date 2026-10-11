import React from 'react';

const DashboardCards = ({ metrics }) => {
  return (
    <div className="dashboard-strip">
      {metrics.map((metric, idx) => (
        <div key={idx} className="dashboard-card">
          <div className="dashboard-card__top">
            <span className="dashboard-card__icon">📊</span>
            <span className="dashboard-card__trend" style={{ color: metric.trend.includes('+') ? '#2e7d32' : '#c62828' }}>
              {metric.trend}
            </span>
          </div>
          <div className="dashboard-card__label">{metric.label}</div>
          <h3>{metric.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
