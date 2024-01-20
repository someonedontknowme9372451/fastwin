import './game.css';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RS from '../components/RS';
import GS from '../components/GS';
import QS from '../components/QS';

const FastParity = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ minutes: '00', seconds: '00' });
  const [colorRecordsList, setColorRecordsList] = useState([]);
  const [activeTab, setActiveTab] = useState('everyOneOrder');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const fetchColors = useCallback((response) => {
    try {
      const data = response.data.data.slice().reverse();
      if (data.length > 0) {
        const latestRecord = data[data.length - 1];
        setColorRecordsList((prevRecords) => {
          const isNotDuplicate = !prevRecords.some(record => record.time === latestRecord.time);
          return isNotDuplicate ? [...prevRecords, latestRecord] : prevRecords;
        });
      }
    } catch (error) {
      console.error('Error fetching color records:', error);
    }
  }, []);

  const handleFetchColors = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/get-color-records/fast-parity');
      setTimeout(() => {
        fetchColors(response);
      }, 3000);
    } catch (err) {
      console.error('Error fetching color records:', err);
    }
  }, [fetchColors]);

  const updateCountdown = useCallback(() => {
    const countDownDate = Date.now() / 1000;
    const distance = 120 - (countDownDate % 120); // Change 30 to 180 for 3 minutes
    const minutes = ('0' + Math.floor(distance / 60)).slice(-2);
    const seconds = ('0' + Math.floor(distance % 60)).slice(-2);
    setCountdown({minutes,seconds});
    setIsButtonDisabled(false);

    if (colorRecordsList.length === 30) {
      setColorRecordsList((prevRecords) => prevRecords.slice(-17));
    }

    if (minutes === '00' && seconds < '30') {
      // Disable the button
      setIsButtonDisabled(true);
    } 

    if (minutes === '00' && seconds === '03') {
      // Your action when both minutes and seconds are 0
      handleFetchColors();
    }
  }, [handleFetchColors, setCountdown, setIsButtonDisabled, colorRecordsList.length]);

  useEffect(() => {
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [updateCountdown]);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-color-records/fast-parity');
        const data = response.data.data.slice().reverse();
        setColorRecordsList(data.slice(-23));
      } catch (error) {
        console.error('Error fetching color records:', error);
      }
    };

    fetchColor();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const everyOneOrderStyle = {
    color: activeTab === 'everyOneOrder' ? '#383b45' : '#979797',
    borderBottom: activeTab === 'everyOneOrder' ? '3px solid #1e88e5' : 'none',
  };

  const myOrderStyle = {
    color: activeTab === 'myOrder' ? '#383b45' : '#979797',
    borderBottom: activeTab === 'myOrder' ? '3px solid #1e88e5' : 'none',
  };

  return (
    <>
      <section id='fastParityNav' className='top-nav'>
          <div className='back' onClick={()=>{navigate(-1)}}>
             <span className='backIcon'></span>
          </div>
             <span className='title'>Sapre</span>
             <span className='rule'>Rule</span>
      </section>
      <section  className='game-col-1'>
          <div className='game-inform'>
            <div className='period-inform'>
              <span className='period-txt'>Period</span>
              <span className='period-number'>202312282524</span>
            </div>

            <div className='count-down'>
               <span className='count-txt'>Count Down</span>
              
              <div className='count-down-box'>
                 <span className="boxs">{countdown.minutes[0]}</span><span className="boxs">{countdown.minutes[1]}</span>:<span className="boxs">{countdown.seconds[0]}</span><span className="boxs">{countdown.seconds[1]}</span>
              </div>
            </div>
            
          </div>
          <div className='game-btn'>
              <div className="color-btn">
                <div className={`join green ${isButtonDisabled ? 'disabled' : ''}`}>
                  <span className='icon'></span>
                  <span className='txt'>Join Green</span>
                </div>
                <div className='color-bet-txt'>1:2</div>
              </div>
              <div className="color-btn">
                <div className={`join violet ${isButtonDisabled ? 'disabled' : ''}`}>
                <span className='icon'></span>
                  <span className='txt'>Join Violet</span>
                </div>
                <div className='color-bet-txt'>1:4.5</div>
              </div>
              <div className="color-btn">
                <div className={`join red ${isButtonDisabled ? 'disabled' : ''}`}>
                <span className='icon'></span>
                  <span className='txt'>Join Red</span>
                </div>
                <div className='color-bet-txt'>1:2</div>
              </div>
          </div>
          <div className='game-number'>
            <div className="num-box">
              <div className={`jnum ${isButtonDisabled ? 'disabled' : ''}`}>1</div>
            </div>
            <div className="num-box">
              <div className={`jnum ${isButtonDisabled ? 'disabled' : ''}`}>2</div>
            </div>
            <div className="num-box">
              <div className={`jnum ${isButtonDisabled ? 'disabled' : ''}`}>3</div>
            </div>
            <div className="num-box">
              <div className={`jnum ${isButtonDisabled ? 'disabled' : ''}`}>4</div>
            </div>
            <div className="num-box">
              <div className={`jnum ${isButtonDisabled ? 'disabled' : ''}`}>5</div>
            </div>
            <div className="num-box">
              <div className={`jnum ${isButtonDisabled ? 'disabled' : ''}`}>6</div>
            </div>
            <div className="num-box">
              <div className={`jnum ${isButtonDisabled ? 'disabled' : ''}`}>7</div>
            </div>
            <div className="num-box">
              <div className={`jnum ${isButtonDisabled ? 'disabled' : ''}`}>8</div>
            </div>
            <div className="num-box">
              <div className={`jnum ${isButtonDisabled ? 'disabled' : ''}`}>9</div>
            </div>
            <div className="num-box">
              <div className={`jnum ${isButtonDisabled ? 'disabled' : ''}`}>0</div>
            </div>
            <div className='number-bet-txt'>1:9</div>
          </div>
      </section>
      <section className='game-col-2'>
          <div className='game-record'>
              <div className='game-record-head'>Record</div>
            <div className='game-record-body'>
              <div className='g-record'>
                  <div className='g-record-col'>
                    <div className='g-record-col-txt'>Sapre Record(s)</div> <div className='g-record-col-more'><span>more {'>'}</span></div>
                  </div>
                <div className='g-record-box'>
                {colorRecordsList.map((data) => (
                    data.color === 'red' ? (
                      <RS key={data.time} num={data.number} period={data.period} />
                    ) : data.color === 'green' ? (
                      <GS key={data.time} num={data.number} period={data.period} />
                    ) : data.color === 'violet' ? (
                      'h'
                    ) : null
                  ))}
                  {/* Loader */}
                  {colorRecordsList.length > 0 && (
                    <QS period={+colorRecordsList[colorRecordsList.length - 1].period + 1} />
                  )}

                </div>
              </div>
              
            </div>
          </div>

          <div className='game-order'>
              <div className='game-order-head'>
              <div className='game-order-head-txt' onClick={() => handleTabChange('everyOneOrder')} style={everyOneOrderStyle}>
                  Everyone's Order
              </div>
              <div className='game-order-head-txt' onClick={() => handleTabChange('myOrder')} style={myOrderStyle}>
                  My Order
              </div>
              </div>
              <div className='game-order-body-1' style={activeTab === 'everyOneOrder' ? { display: 'flex' } : { display: 'none' }}>
                  <div className='game-order-body-row'>
                      <div className='game-order-body-row-txt-4'>Period</div>
                      <div className='game-order-body-row-txt-3'>User</div>
                      <div className='game-order-body-row-txt-2'>Select</div>
                      <div className='game-order-body-row-txt-3'>Point</div>
                  </div>
              </div>

              <div className='game-order-body-2' style={activeTab === 'myOrder' ? { display: 'flex' } : { display: 'none' }}>
                <div className='game-order-body-row'>
                      <div className='game-order-body-row-txt-100'>Period</div>
                      <div className='game-order-body-row-txt-36'>Select</div>
                      <div className='game-order-body-row-txt-46'>Point</div>
                      <div className='game-order-body-row-txt-36'>Result</div>
                      <div className='game-order-body-row-txt-80'>Amount</div>
                </div>
              </div>
          </div>
      </section>
    </>

  )
}

export default FastParity