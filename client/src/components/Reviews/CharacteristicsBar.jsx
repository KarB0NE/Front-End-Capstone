import React from 'react';

function CharacteristicsBar({ value, labels }) {
  const qualityPercentage = (value / 5) * 100;

  return (
    <div className="characteristics-bar-container">
      <div className="characteristics-bar-background">
        <div className="characteristics-bar-block" />
        <div className="characteristics-bar-block" />
        <div className="characteristics-bar-block" />
        <div className="characteristics-bar-block" />
        <div className="characteristics-bar-block" />
        <div className="characteristics-triangle" style={{ left: `${qualityPercentage}%` }} />
      </div>
      <div className="label-background">
        <div className="label-block left"><span>{labels[0]}</span></div>
        <div className="label-block"><span>{labels[1]}</span></div>
        <div className="label-block right"><span>{labels[2]}</span></div>

      </div>
    </div>
  );
}

export default CharacteristicsBar;
