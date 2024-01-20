import './page.css';
import { useNavigate } from 'react-router-dom'

const TaskReward = () => {
 const navigate= useNavigate()
  return (
    <>
     <section id='rewardNav' className='top-nav'>
           <div className='rewardBack' onClick={()=>{navigate(-1)}}><span className='back'></span></div>
           <span className='rewardHead'>Rewards</span>    
    </section>
        <section id='rewardBody'>
          <div className='reward-box'>
              <div className='reward-head'> <span className='head-1'>Welcome</span> <span className='head-2'>₹20</span></div>
              <div className='lbox'><div className='lback'><span className='l100'></span></div></div>
              <div className='reward-txt'>We will reward you with ₹20</div>
              <div className='btnbox'><button className='btn'>Claimed</button></div>
          </div>
          <div className='reward-box'>
              <div className='reward-head'> <span className='head-1'>First recharge</span> <span className='head-2'>₹20</span></div>
              <div className='lbox'><div className='lback'><span className='l100'></span></div></div>
              <div className='reward-txt'>This reward can only be obtained by doing your first recharge.</div>
              <div className='btnbox'><button className='btn'>Claimed</button></div>
          </div>
          <div className='reward-box'>
              <div className='reward-head'> <span className='head-1'>Daily 100 orders</span> <span className='head-2'>₹10</span></div>
              <div className='lbox'><div className='lback'><span className='l10'></span></div></div>
              <div className='reward-txt'>You need to complete 100 games in order to receive this reward.</div>
              <div className='btnbox'><button className='btn'>Claimed</button></div>
          </div>
          
        </section>
    </>
  )
}

export default TaskReward