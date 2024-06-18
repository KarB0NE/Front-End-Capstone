import React from 'react';

function PercentageBar({ ratingPercentage }) {
  return (
    <div className="percentage-bar-container">
      <div
        className="percentage-bar"
        style={{ width: `${ratingPercentage}%` }}
      />
    </div>
  );
}
export default PercentageBar;
