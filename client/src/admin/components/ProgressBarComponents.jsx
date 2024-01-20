import './components.css';
import { useState, useEffect } from 'react';

const ProgressBarComponents = ({ value1, value2, value3, option }) => {
  const [progress1, setProgress1] = useState(value1);
  const [progress2, setProgress2] = useState(value2);
  const [progress3, setProgress3] = useState(value3);
  const [selectedOption, setSelectedOption] = useState(option);
  useEffect(() => {
    const total = value1 + value2 + value3;
    if (total === 0) {
      setProgress1(0);
      setProgress2(0);
      setProgress3(0);
    } else {
      setProgress1(Math.floor((value1 / total) * 100));
      setProgress2(Math.floor((value2 / total) * 100));
      setProgress3(Math.floor((value3 / total) * 100));
    }
  }, [value1, value2, value3]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
   alert(event.target.value)
  };


  return (
    <div className='progress-container'>
      <div className="progress-box">
        <div className="progress-bar">
          <div className="progress red" style={{ width: `${progress1}%`, color: progress1 === 0 ? '#fa3c09' : '#fff' }}>{`${progress1.toFixed(2)}%`}</div>
        </div>
        <div className='checkbox'>
          <input
            type="checkbox"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={() => {handleOptionChange}}
          />
        </div>
      </div>
      <div className="progress-box">
        <div className="progress-bar">
          <div className="progress green" style={{ width: `${progress2}%`, color: progress2 === 0 ? '#00c282' : '#fff' }}>{`${progress2.toFixed(2)}%`}</div>
        </div>
        <div className='checkbox'>
          <input
            type="checkbox"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={() => {handleOptionChange}}
          />
        </div>
      </div>
      <div className="progress-box">
        <div className="progress-bar">
          <div className="progress violet" style={{ width: `${progress3}%`, color: progress3 === 0 ? '#6655d3' : '#fff' }}>{`${progress3.toFixed(2)}%`}</div>
        </div>
        <div className='checkbox'>
          <input
            type="checkbox"
            value="option3"
            checked={selectedOption === "option3"}
            onChange={() => {handleOptionChange}}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBarComponents;
