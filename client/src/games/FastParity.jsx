import './game.css';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RS from '../components/RS';
import GS from '../components/GS';
import QS from '../components/QS';
import BottomDialog from '../components/BottomDialog';
import BaseApi from '../api/BaseApi';
import { useCookies } from 'react-cookie';
import RVS from '../components/RVS';
import GVS from '../components/GVS';


const FastParity = () => {
  const BASE_API_URL= BaseApi();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['record']);
  const [countdown, setCountdown] = useState('00');
  const [colorRecordsList, setColorRecordsList] = useState([]);
  const [activeTab, setActiveTab] = useState('everyOneOrder');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDialogOpenValue, setIsDialogOpenValue] = useState('')


  const fetchNewRecord = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/v1/fastParity`);
      let data = Array.isArray(response.data) ? response.data.slice().reverse() : (response.data && Array.isArray(response.data.data) ? response.data.data.slice().reverse() : []);
      
      if (data.length > 0) {
        const latestRecord = data[data.length - 1];
        
        setColorRecordsList((prevRecords) => {
          const isNotDuplicate = !prevRecords.some(record => record.period === latestRecord.period);
          if (isNotDuplicate) {
            const newRecords = [...prevRecords, latestRecord];
            setCookie('record', newRecords.length <= 29 ? newRecords.length : 19); // Update the cookie record based on the new records length
            return newRecords;
          } else {
            return prevRecords;
          }
        });
      }
    } catch (err) {
      console.error('Error fetching new record:', err);
    }
  }, [BASE_API_URL, setColorRecordsList, setCookie]);
  
  const updateCountdown = useCallback(() => {
    const countDownDate = Date.now() / 1000;
    const distance = 30 - (countDownDate % 30); // Change 30 to 180 for 3 minutes
    const seconds = ('0' + Math.floor(distance % 60)).slice(-2);
    setCountdown(seconds);
    setIsButtonDisabled(false);
  
    if (seconds < '10'){
      setIsButtonDisabled(true);
    } 
    if(seconds < '03'){
      fetchNewRecord();
    }  
  }, [setCountdown, setIsButtonDisabled, fetchNewRecord]);
  
  useEffect(() => {
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [updateCountdown]);
  
  useEffect(() => {
    let isMounted = true;
    const fetchColor = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/v1/fastParity`);
        if (isMounted) {
          if (!cookies.record) {
            setCookie('record', 19);
          }
          let reversedData = Array.isArray(response.data) ? response.data.slice().reverse() : (response.data && Array.isArray(response.data.data) ? response.data.data.slice().reverse() : []);
          setColorRecordsList(reversedData.slice(-cookies.record));
        }
      } catch (error) {
        console.error('Error fetching color records:', error);
      }
    };
    fetchColor();
    return () => {
      isMounted = false;
    };
  }, [BASE_API_URL, cookies.record, setCookie, setColorRecordsList]);
  
  
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


  const handleDialogOpen =(value)=>{
   setIsDialogOpen(true)
    setIsDialogOpenValue(value)
   //alert(color)
  }
  const toggleDialog = (isOpen) => {
    setIsDialogOpen(isOpen);
  };


  return (
    <>
      <section id='fastParityNav' className='top-nav'>
          <div className='back' onClick={()=>{navigate(-1)}}>
             <span className='backIcon'></span>
          </div>
             <span className='title'>Fast-Parity</span>
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
                <span className="boxs">0</span><span className="boxs">0</span>:<span className="boxs">{countdown[0]}</span><span className="boxs">{countdown[1]}</span>
              </div>
            </div>
            
          </div>
          {/* <BottomDialog color={'green'}/> */}
          <div className='game-btn'>
              <div className="color-btn">
                <div className={`join green ${isButtonDisabled ? 'disabled' : ''}`} onClick={()=>handleDialogOpen('green')}>
                  <span className='icon'></span>
                  <span className='txt'>Join Green</span>
                </div>
                <div className='color-bet-txt'>1:2</div>
              </div>
              <div className="color-btn">
                <div className={`join violet ${isButtonDisabled ? 'disabled' : ''}`}  onClick={()=>handleDialogOpen('violet')}>
                <span className='icon'></span>
                  <span className='txt'>Join Violet</span>
                </div>
                <div className='color-bet-txt'>1:4.5</div>
              </div>
              <div className="color-btn">
                <div className={`join red ${isButtonDisabled ? 'disabled' : ''}`}  onClick={()=>handleDialogOpen('red')}>
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
                    <div className='g-record-col-txt'>Fast-Parity Record(s)</div> <div className='g-record-col-more'><span>more {'>'}</span></div>
                  </div>
                <div className='g-record-box'>
                {colorRecordsList.map((data) => {
                    const number = data.number;
                    const isEven = number.includes(2) || number.includes(4) || number.includes(6) || number.includes(8);
                    const isOdd = number.includes(1) || number.includes(3) || number.includes(7) || number.includes(9);
                    const isZero = number.includes(0);
                    const isFive = number.includes(5);

                    if (isEven) {
                      return <RS key={data.time} num={number} period={data.period} />;
                    } else if (isOdd) {
                      return <GS key={data.time} num={number} period={data.period} />;
                    } else if (isZero) {
                      return <RVS key={data.time} period={data.period}/>
                    } else if (isFive) {
                      return <GVS key={data.time} period={data.period}/>;
                    }
                    return null;
                })}
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
      {isDialogOpen && <BottomDialog value={isDialogOpenValue} isDialog={toggleDialog}/>}
    </>

  )
}

export default FastParity