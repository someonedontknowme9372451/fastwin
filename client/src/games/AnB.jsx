import './game.css';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CardImage1 from '../assets/images/AvB/1.png'
import CardImage2 from '../assets/images/AvB/2.png'
import CardImage3 from '../assets/images/AvB/3.png'
import CardImage4 from '../assets/images/AvB/4.png'
import CardImage5 from '../assets/images/AvB/5.png'
import CardImage6 from '../assets/images/AvB/6.png'
import CardImage7 from '../assets/images/AvB/7.png'
import CardImage8 from '../assets/images/AvB/8.png'
import CardImage9 from '../assets/images/AvB/9.png'
import AvBCardImage from '../assets/images/AvB/avbcards_bk.png'
import AndarCardImage from '../assets/images/AvB/and_bk.png'
import BaharCardImage from '../assets/images/AvB/bnd_bk.png'
import QS from '../components/QS'
import AS from '../components/AS'
import TS from '../components/TS'
import BS from '../components/BS' 


const AnB = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ minutes: '00', seconds: '00' });
  const [colorRecordsList, setColorRecordsList] = useState([]);
  const [activeTab, setActiveTab] = useState('everyOneOrder');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
 
  const [andarImages, setAndarImages] = useState([]);
  const [baharImages, setBaharImages] = useState([]);
  const [isResultImage, setIsResultImage] = useState('')
   
  const imageMap = {
    1: CardImage1,
    2: CardImage2,
    3: CardImage3,
    4: CardImage4,
    5: CardImage5,
    6: CardImage6,
    7: CardImage7,
    8: CardImage8,
    9: CardImage9,
  };
  const cardMove = () => {
    const num = [5, 1, 4, 9, 2, 8,6,3];
    const result = 3;
    let i = 0;
    let isLeftMove= true;
  
    const intervalId = setInterval(() => {
      if (num[i] === result) {
        handleResult(i);
      } else {
        handleMove(i);
      }
      i++;
      if (i >= num.length) {
        handleEndOfArray();
      }
    }, 1000);
  
    const handleResult = (currentIndex) => {
      clearInterval(intervalId);
      console.log("Result found");
      setIsResultImage(imageMap[num[currentIndex]]);
      clearImagesAfterDelay();
      toggleMoveDirection();
    };
  
    const handleMove = (currentIndex) => {
      console.log("Move card " + (isLeftMove ? "left" : "right"));
      if (isLeftMove) {
        setAndarImages((prevImages) => [...prevImages, imageMap[num[currentIndex]]]);
      } else {
        setBaharImages((prevImages) => [...prevImages, imageMap[num[currentIndex]]]);
      }
      toggleMoveDirection();
    };
  
    const handleEndOfArray = () => {
      clearInterval(intervalId);
      console.log("Move card Tie");
      clearImagesAfterDelay();
      toggleMoveDirection();
    };
    const clearImagesAfterDelay = () => {
      setTimeout(() => {
        // setAndarImages([AndarCardImage]);
        // setBaharImages([BaharCardImage]);
        // setIsResultImage('')
  
      }, 2000);
    };
    const toggleMoveDirection = () => {
     isLeftMove =!isLeftMove;
    };
  
    return () => clearInterval(intervalId);
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
    if(seconds==='00'){
      cardMove();
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
             <span className='title'>Andar Bahar</span>
             <span className='rule'>Rule</span>
      </section>
      <section  className='game-col-1 AnB'>
          <div className='game-inform'>
            <div className='period-inform'>
              <span className='period-txt AnB-tf-1'>Period</span>
              <span className='period-number AnB-tf-2'>202312282524</span>
            </div>

            <div className='count-down'>
               <span className='count-txt AnB-tf-1'>Count Down</span>
              
              <div className='count-down-box'>
                <span className="boxs">{countdown.minutes[0]}</span><span className="boxs">{countdown.minutes[1]}</span>:<span className="boxs">{countdown.seconds[0]}</span><span className="boxs">{countdown.seconds[1]}</span>
              </div>
            </div>
            
          </div>
          <div className='game-AnB'>
               <div className='AnB-row-1'>
                    <div className='AnB-cardv'>
                       <img className='AnB-cardv' style={countdown.seconds==='00' ? {marginTop:144}:{marginTop:0}} src={CardImage3} alt="card" />
                    </div>
               </div>
               <div className='AnB-row-2'>
                  <div>
                      <img className='AnB-cardv wt' src={AndarCardImage} alt="card" />
                      {andarImages.map((data)=>(
                        <img key={new Date()} className='AnB-cardv wt crdand' src={data}/>
                      ))}
                  </div> 
                  <div>
                  <img className='AnB-cardv alc' src={AvBCardImage} alt="card" />
                    { 
                     isResultImage!== '' &&  <img className='anmcrd abwnxb bahar' id='wicrd' src={isResultImage} alt="card"/>
                    }
                 {/* <img className='anmcrd bahar' id='wicrd' src={CardImage1} alt="card"/> */}
                  </div>
                  <div>
                      <img className='AnB-cardv wt' src={BaharCardImage} alt="card" />
                      {baharImages.map((data)=>(
                        <img key={new Date()} className='AnB-cardv wt crdbnd' src={data}/>
                      ))}
                  </div>  
               </div>
               <div className='AnB-row-3'>
                  <div className="AnB-col-btn">
                     <div className={`join andar ${isButtonDisabled? 'disabled':''}`}>Andar</div>
                     <div className='card-bet-txt'>1:2</div>
                  </div>
                  <div className="AnB-col-btn">
                     <div className={`join tie ${isButtonDisabled? 'disabled':''}`}>Tie</div>
                     <div className='card-bet-txt'>1:9</div>
                  </div>
                  <div className="AnB-col-btn">
                     <div className={`join bahar ${isButtonDisabled? 'disabled':''}`}>Bahar</div>
                     <div className='card-bet-txt'>1:2</div>
                  </div>
                  <div className="AnB-col-btn">

                  </div>
               </div>
          </div>
      </section>
      <section className='game-col-2'>
          <div className='game-record'>
              <div className='game-record-head'>Record</div>
            <div className='game-record-body'>
              <div className='g-record'>
                  <div className='g-record-col'>
                    <div className='g-record-col-txt'>Andar Bahar Record(s)</div> <div className='g-record-col-more'><span>more {'>'}</span></div>
                  </div>
                <div className='g-record-box'>
                {colorRecordsList.map((data) => (              
                      <TS key={data.time} num={data.number} period={data.period} />               
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

export default AnB