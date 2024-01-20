import './page.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
//const Treasure_b= lazy(()=>import('../assets/images/Treasure_b.png'))
import Treasure_b from '../assets/images/Treasure_b.png'
const CheckIn = () => {
  const navigate = useNavigate();
  const [isChecked, setisChecked] = useState(true)
  const [coinChecked, setCoinChecked] = useState({
    day1:false,
    day2:false,
    day3:false,
    day4:false,
    day5:false,
    day6:false,
    day7:false,
    box:false
  });
  const handleCoinCheck=(day)=>{
    setCoinChecked({
      ...coinChecked,
      [day]:true
    })
  }
  return (
    <>
    <section id='checkNav' className='top-nav'>
    <div className='checkBack' onClick={()=>{navigate(-1)}}> 
         <span className='back'></span>
    </div> 
    <div className='checkHead'> Check In</div>
    </section> 
    <section id='checkBody'>

    <div id='checkBox'>
     <div className='check-row'>
     <div className='day'>
         <span>Day 1</span>
         <span>Day 2</span>
         <span>Day 3</span>
         <span>Day 4</span>  
      </div>

       <div className='coins'>
         <span className={`coin ${coinChecked.day1 ? 'checked':''}`} onClick={()=>handleCoinCheck('day1')}></span>
         <span className={`coin ${coinChecked.day2 ? 'checked':''}`} onClick={()=>handleCoinCheck('day2')}></span>
         <span className={`coin ${coinChecked.day3 ? 'checked':''}`} onClick={()=>handleCoinCheck('day3')}></span>
         <span className={`coin ${coinChecked.day4 ? 'checked':''}`} onClick={()=>handleCoinCheck('day4')}></span>
       </div>
       <div className='money'>
         <span>+1</span>
         <span>+1</span>
         <span>+1</span>
         <span>+1</span>
       </div> 

     </div>
     <div className='check-row row75'>
     <div className='day'>
         <span>Day 5</span>
         <span>Day 6</span>
         <span>Day 7</span>
      </div>
       <div className='coins'>
         <span className={`coin ${coinChecked.day5 ? 'checked':''}`} onClick={()=>handleCoinCheck('day5')}></span>
         <span className={`coin ${coinChecked.day6 ? 'checked':''}`} onClick={()=>handleCoinCheck('day6')}></span>
         <span className={`coin ${coinChecked.day7 ? 'checked':''}`} onClick={()=>handleCoinCheck('day7')}></span>
       </div>
       <div className='money'>
         <span>+1</span>
         <span>+1</span>
         <span>+1</span>
       </div> 

     </div>
     <div className='check-row row25'>
        <div className={`teaser-box ${coinChecked.box ? 'checked':''}`} onClick={()=>handleCoinCheck('box')}></div> 
     </div>

     <div className='check-button'>
       <button className={`btn ${isChecked ? 'checked':''}`} >Check In</button>
     </div> 
    
    </div>
      <p>Check in for 7 consecutive days to get treasure box and receive mysterious prizes! .</p>
      <img src={Treasure_b} alt=''/>
    </section>
    </>
  )
}

export default CheckIn