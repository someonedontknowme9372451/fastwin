import React from 'react';

const RVS = ({period}) => {
  return (
    <div className="ball-box rcd-pillar">
      <div className="ball RS">
        <div className="vil"></div>
        <div className="tpr">0</div>
      </div>
      <div className="ball-num">{period}</div>
    </div>
  );
}

export default RVS;
