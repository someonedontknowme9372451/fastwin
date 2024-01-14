import  { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import fastParityImage from '../assets/images/fast-parity.jpg'
import parityImage from '../assets/images/parity.jpg'
import taskRImage from '../assets/images/TaskR.png'
import checkRImage from '../assets/images/checkR.png'
import refreshIcon from '../assets/images/refresh_small.png';
import referBannerImage from '../assets/images/refer_bn.svg';
import  AnBImage from '../assets/images//AnB.jpg';
import  sapreImage from '../assets/images/sapre.jpg';
import  diceImage from '../assets/images/dice.jpg';
import  wheelImage from '../assets/images/wheel.jpg';
import  MineSweeperImage from '../assets/images/MineSweeper.png';
import  jetxImage from '../assets/images/jetx.png';
import  ludoImage from '../assets/images/ludo.png';

const Home = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const navigate = useNavigate();
  
  const handleAmountRefresh=()=>{
    setIsRefresh(true)
    setTimeout(()=>{
        setIsRefresh(false)
    },3000)
  }
  
  return (
    <>
    <div>
    <Navbar/>
    <section id='HomeTop'>
     <div className='info'>
     <h4>Balance</h4>
       <div className="amount">
        ₹<h2>234.00</h2> <span id='refresh-box'><img className={isRefresh ? 'refresh active' : 'refresh'} src={refreshIcon} alt="refresh" onClick={handleAmountRefresh}/></span>
       </div> 
      <div className="id">
      ID: <h5>12345</h5>
        </div>
     </div>
     <div id='button'>
      <button>Recharge</button>
      <button onClick={()=>{navigate('/withdraw')}}>Withdraw</button>
     </div>
   </section>
   
   <section id='HomeReward'>
     <div onClick={()=>{navigate('/task-reward')}}>
       <img src={taskRImage} alt='' className='homeIcon'/>
       <h4>Task reward</h4>
     </div>
     <div onClick={()=>{navigate('/check-in')}}>
      <img src={checkRImage} alt='' className='homeIcon'/>
       <h4>Check in</h4>
     </div>
   </section>
   <section id='HomeReferBanner'>
    <img src={referBannerImage} alt='refer'></img>
   </section>
 
   <section id='HomeGame'>
     <img src={fastParityImage} alt='fast-parity' onClick={()=>{navigate('/fast-parity')}}/>
   
    <img src={parityImage} alt='parity' onClick={()=>{navigate('/parity')}}/>
    {/* <img src={sapreImage} alt='sapre' onClick={()=>{navigate('/sapre')}}/> */}
    <img src={diceImage} alt='dice' onClick={()=>{navigate('/dice')}}/>
    <img src={AnBImage} alt='AnB' onClick={()=>{navigate('/AnB')}}/>
    <img src={wheelImage} alt='wheel' onClick={()=>{navigate('/circle')}}/>
    <img src={jetxImage} alt='jetx'/>
    <img src={MineSweeperImage} alt='MineSweeper'/>
    <img src={ludoImage} alt='ludo'/>
   </section>
   
   </div> 
    </>
  )
}

export default Home