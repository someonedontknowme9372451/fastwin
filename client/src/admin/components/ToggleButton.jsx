// Importing necessary dependencies and styles
import React from 'react';
import './components.css';

// Define the ToggleButton functional component
const ToggleButton = ({ setIsManualResult }) => {
  // Handle checkbox change event
  const handleCheckboxChange = () => {
    setIsManualResult((prevValue) => !prevValue); // Toggle the manual result state
  };

  // JSX structure for rendering the component
  return (
    <div>
      <input
        type="checkbox"
        name="checkbox"
        className="toggle"
        id="toggle"
        onChange={handleCheckboxChange}
      />
      <label htmlFor="toggle" className="switch"></label>
    </div>
  );
};

// Export the ToggleButton component as the default export
export default ToggleButton;
