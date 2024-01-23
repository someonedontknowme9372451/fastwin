// Importing necessary dependencies and styles
import React from 'react';
import './components.css';
import ToggleButton from './ToggleButton';

// Define the WiningHeaderComponent functional component
const WiningHeaderComponent = ({ setHeaderValue, setIsManualResult }) => {
 // Helper function to create a radio button
const renderRadioButton = (label, value, isChecked) => (
  <div className="wining-col" key={value}>
    <label className="category-label">
      {label}
      <br />
      <input
        type="radio"
        className="tabbtn"
        name="tab"
        value={value}
        defaultChecked={isChecked}
        onChange={() => setHeaderValue(value)}
      />
    </label>
  </div>
);

  // Array of categories for radio buttons
  const categories = [
    { label: 'Fast Parity', value: 'fast_parity' },
    { label: 'Parity', value: 'parity' },
    { label: 'Dice', value: 'dice' },
    { label: 'Andar Bahar', value: 'andar_bahar' },
    { label: 'Ludo', value: 'ludo' },
    { label: 'Jet', value: 'jet' },
    { label: 'Mine Sweeper', value: 'mine_sweeper' },
    { label: 'Spare', value: 'spare' },
  ];

  // JSX structure for rendering the component
  return (
    <div className="wining-header">
      <div className="wining-row">
        {categories.map(({ label, value }) => renderRadioButton(label, value, value === 'fast_parity'))}
      </div>
      <div className="wining-condition">
        <span className="toggle-tf">Do you want manual result?</span>
        <div className="toggle-box">
          {/* Render the ToggleButton component */}
          <ToggleButton setIsManualResult={setIsManualResult} />
        </div>
      </div>
    </div>
  );
};

// Export the WiningHeaderComponent as the default export
export default WiningHeaderComponent;
