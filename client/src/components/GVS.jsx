import React from 'react';

const GVS = ({period}) => {
  return (
    <div className="ball-box rcd-pillar">
      <div className="ball GS">
        <div className="vil"></div>
        <div className="tpr">5</div>
      </div>
      <div className="ball-num">{period}</div>
    </div>
  );
}

export default GVS;
