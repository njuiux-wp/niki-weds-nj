import React from 'react';

const ProgressBar = ({ total, paid }) => {
  const percentage = total > 0 ? (paid / total) * 100 : 0;

  return (
    <div className="w-full app-theme-bg-lightburgundy rounded-full h-4 overflow-hidden">
      <div
        className="app-theme-bg-burgundy h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
