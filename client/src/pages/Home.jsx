import './page.css';
import  { useCallback, useEffect, useState } from 'react'
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
import  wheelImage from '../assets/images/wheel.jpg';
import  MineSweeperImage from '../assets/images/MineSweeper.png';
import  jetxImage from '../assets/images/jetx.png';
import diceImage from '../assets/images/dice.jpg'
import  ludoImage from '../assets/images/ludo.png';
import LoginAuth from '../Hooks/LoginAuth';
import axios from 'axios';
import BaseApi from '../api/BaseApi';
import { useCookies } from 'react-cookie';



const Home = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();
  const user = LoginAuth();
  const [cookie,setCookie] =useCookies([''])
  const userId= cookie['id']
  const API_BASE_URL = BaseApi();
  const fetchBalance = useCallback(async () => {
    setIsRefresh(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/`);
      const balance= response.data.user.balance;
      setCookie('balance',balance)
      setTimeout(() => {
        setBalance(balance);
        setIsRefresh(false);
      }, 1000);
    } catch (error) {
      console.error('Error refreshing balance:', error);
      setIsRefresh(false);
    }
  }, [API_BASE_URL,setCookie]);

  useEffect(() => {
    if (user) {  
      fetchBalance();
    }
  }, [user,fetchBalance]);

  const handleAmountRefresh = useCallback(() => {
    fetchBalance();
  }, [fetchBalance]);

  
  return (
    <>
    <div>
    <Navbar/>
    <section id='HomeTop'>
     <div className='info'>
     <h4>Balance</h4>
       <div className="amount">
       ₹<h2>{balance || '0'}</h2><span id='refresh-box'><img className={isRefresh ? 'refresh active' : 'refresh'} src={refreshIcon} alt="refresh" onClick={handleAmountRefresh}/></span>
       </div> 
      <div className="id">
      ID: <h5>{userId}</h5>
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
    <div className='col-6 pdr5'>
      <div className='icard'>
        <img src={fastParityImage} alt='fast-parity' onClick={()=>{navigate('/fast-parity')}}/>
      </div>
    </div>
    <div className='col-6 pdl5'>
      <div className='icard'>
        <img src={parityImage} alt='fast-parity' onClick={()=>{navigate('/parity')}}/>
      </div>
    </div>
    <div className='col-6 pdr5'>
      <div className='icard'>
        <img src={AnBImage} alt='fast-parity' onClick={()=>{navigate('/AnB')}}/>
      </div>
    </div>
    <div className='col-6 pdl5'>
      <div className='icard'>
        <img src={wheelImage} alt='fast-parity' onClick={()=>{navigate('/circle')}}/>
      </div>
    </div>
    <div className='col-6 pdr5'>
      <div className='icard'>
        <img src={jetxImage} alt='fast-parity' onClick={()=>{navigate('/')}}/>
      </div>
    </div>
    <div className='col-6 pdl5'>
      <div className='icard'>
        <img src={diceImage} alt='fast-parity' onClick={()=>{navigate('/dice')}}/>
      </div>
    </div>
    <div className='col-6 pdr5'>
      <div className='icard'>
        <img src={MineSweeperImage} alt='fast-parity' onClick={()=>{navigate('/')}}/>
      </div>
    </div>
    <div className='col-6 pdl5'>
      <div className='icard'>
        <img src={ludoImage} alt='fast-parity' onClick={()=>{navigate('/')}}/>
      </div>
    </div>
    <div className='col-6 pdr5'>
      <div className='icard'>
        <img src={sapreImage} alt='fast-parity' onClick={()=>{navigate('/')}}/>
      </div>
    </div>
   </section>
   
   </div> 
    </>
  )
}

export default Home