import './game.css';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import wheelImage from '../assets/images/wheel_h.png'
import WBlue from '../components/WBlue'
import WBlack from '../components/WBlack'
import WRed from '../components/WRed'
import WGreen from '../components/WGreen'
import WQues from '../components/WQues';
const Dice = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({seconds: '00', milliseconds: '000',});
  const [activeTab, setActiveTab] = useState('everyOneOrder');
  const [isSpin, setIsSpin] = useState(false)
  const [wheelResultRecords, setWheelResultRecords] = useState([1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,])

  const updateCountdown = useCallback( () => {
    const countDownDate = Date.now() / 1000;
    const distance = 30 - (countDownDate % 30);
    const seconds = ('0' + Math.floor(distance % 60)).slice(-2);
    const milliseconds = ('00' + Math.floor((distance % 1) * 1000)).slice(-3);
    setCountdown({ seconds, milliseconds });
    if (seconds === '00') {
      setIsSpin(true)
       setTimeout(()=>{
        setIsSpin(false) 
      },5000)
    }
  }, []);

  useEffect(()=>{
    updateCountdown();
  })


  


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
      <section  className='game-col-1 circle'>
          <div className='game-inform'>
            <div className='period-inform'>
              <span className='period-txt circle-tf'>Period</span>
              <span className='period-number circle-tf'>202312282524</span>
            </div>

            <div className='count-down'>
               <span className='count-txt circle-tf'>Count Down</span>
              
               <div className='count-down-box'>
                  <span className="boxs">{isSpin ? '0' : countdown.seconds[0]}</span>
                  <span className="boxs">{isSpin ? '0' : countdown.seconds[1]}</span>
                  :
                  <span className="boxs">{isSpin ? '0' : '0'}</span>
                  <span className="boxs">{isSpin ? '0' : countdown.milliseconds[0]}</span>
                </div>
            </div>
            
          </div>
          <div className='game-circle'>
               <div className='circle-result'>
               {wheelResultRecords.map((data)=>(
                    <WBlue key={data}/>
                    // <WBlack key={data}/>,
                    // <WRed key={data}/>,
                    // <WGreen key={data}/>
               ))}
               {wheelResultRecords.length > 0 && (
                   <WQues/>    
               )}
               </div>
               <div className='circle-box'>
                  <div className='circle-arrow'></div>
                  <div className="circle-rounded"> <img className={`circle-img ${isSpin ? 'spin':''}`} id="wheel" src={wheelImage} style={{transform:'rotate(329deg)'}}/> 
                  </div>
                  <div className="circle-btn">
                       <div className='cirbtn black'>2x</div>
                       <div className='cirbtn blue'>3x</div>
                       <div className='cirbtn green'>10x</div>
                  </div>
               </div>
          </div>
      </section>

      <section className='game-col-2'>
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