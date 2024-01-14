import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RangeSlider from '../components/RangeSlider'
import NS from '../components/NS';
import QS from '../components/QS';

const Dice = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ minutes: '00', seconds: '00' });
  const [colorRecordsList, setColorRecordsList] = useState([]);
  const [activeTab, setActiveTab] = useState('everyOneOrder');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [range, setRange] = useState(43);
  const [multiplier, setMultiplier] = useState(12.33)

  const handleRangeChange =(e)=>{
     setRange(e.target.value)
     calculateMultiplier()
  }
  // const calculateMultiplier = () => {
  //   let multiplier;
  //   if (range >= 100) {
  //     multiplier =  /* add 0.1 */
  //   }
  //   else if(range >= 90) {
  //     multiplier =  /* add 0.1.3 */
  //   }
  //   else if(range >= 80) {
  //     multiplier = /* add 0.2  */
  //   } 
  //   else if(range >= 70) {
  //     multiplier = /* add 0.25  */
  //   } 
  //   else if (range >= 60) {
  //     multiplier = /* add 0.3 */
  //   }
  //   else if (range >= 50) {
  //     multiplier = /* add 0.5 */
  //   }
  //    else if (range >= 40) {
  //     multiplier = /* add 0.7 */
  //   } 
  //   else if (range >= 30) {
  //     multiplier = /* add 1 */
  //   } 
  //   else if (range >= 20) {
  //     multiplier = /*  add 1.3 */
  //   }
  //    else if (range >= 10) {
  //     multiplier = /*add 1.7 */
  //   }
  //   else if (range >= 5) {
  //     multiplier = /*add 2.3 */
  //   }
  //   setMultiplier(multiplier)
  // };
  
  const calculateMultiplier = () => {
    let multiplier;
  
    if (range >= 100) {
      multiplier = 0.1;
    } else if (range >= 90) {
      multiplier = 0.13;
    } else if (range >= 80) {
      multiplier = 0.2;
    } else if (range >= 70) {
      multiplier = 0.25;
    } else if (range >= 60) {
      multiplier = 0.3;
    } else if (range >= 50) {
      multiplier = 0.5;
    } else if (range >= 40) {
      multiplier = 0.7;
    } else if (range >= 30) {
      multiplier = 1;
    } else if (range >= 20) {
      multiplier = 1.3;
    } else if (range >= 10) {
      multiplier = 1.7;
    } else if (range >= 5) {
      multiplier = 2.3;
    }
  
    setMultiplier(multiplier);
  };
  

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
    const distance = 60 - (countDownDate % 60); // Change 30 to 180 for 3 minutes
    const minutes = ('0' + Math.floor(distance / 60)).slice(-2);
    const seconds = ('0' + Math.floor(distance % 60)).slice(-2);
    setCountdown({minutes,seconds});
    setIsButtonDisabled(false);

    if (colorRecordsList.length === 30) {
      setColorRecordsList((prevRecords) => prevRecords.slice(-17));
    }

    if (minutes === '00' && seconds < '10'){
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
             <span className='title'>Dice</span>
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
          <div className='game-dice'>
             <div className='dice-range-info'>
              <div className='dice-col dsbd'>
                  <div className='dice-tf-14'>Less than</div>
                  <div className='dice-tf-20'>{range}</div>
              </div>
              <div className='dice-col'>
                  <div className='dice-tf-14'>Multiplier</div>
                  <div className='dice-tf-20'>{multiplier}</div>
              </div>
             </div>
           <div className='dice-slide'>
              <RangeSlider min={1} max={100} value={range} onChange={handleRangeChange}/>
               <div className='dice-slide-txt'>
                <span>1</span>
                <span>|</span>
                <span>25</span>
                <span>|</span>
                <span>50</span>
                <span>|</span>
                <span>75</span>
                <span>|</span>
                <span>99</span>
               </div>
           </div>
           <div className='dice-btn-col'>
            <button className={`dice-btn ${isButtonDisabled ? 'disabled' :''}`} type="submit">Less than {range}</button>
            </div>
          </div>
      </section>
      <section className='game-col-2'>
          <div className='game-record'>
              <div className='game-record-head'>Record</div>
            <div className='game-record-body'>
              <div className='g-record'>
                  <div className='g-record-col'>
                    <div className='g-record-col-txt'>Dice Record(s)</div> <div className='g-record-col-more'><span>more {'>'}</span></div>
                  </div>
                <div className='g-record-box'>
                {colorRecordsList.map((data) => (              
                      <NS key={data.time} num={data.number} period={data.period} />               
                  ))}
                 
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

export default Dice