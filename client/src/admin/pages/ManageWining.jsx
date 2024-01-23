import { useEffect, useState, useRef } from 'react';
import './page.css';
import FastPartyComponent from '../components/FastPartyComponent';
import WiningHeaderComponent from '../components/WiningHeaderComponent';
import ParityComponent from '../components/ParityComponent';
import axios from 'axios'

const ManageWining = () => {
  const [headerValue, setHeaderValue] = useState('fast_parity');
  const [countDown, setCountDown] = useState({ minutes: '00', seconds: '00' });
  const intervalIdRef = useRef(null);
  const [actionIndex, setActionIndex] = useState(null);
  const [isManualResult, setIsManualResult] = useState(true)

  
  useEffect(() => {
    let intervalId;
  
    if (headerValue === 'fast_parity') {
      intervalId = fastParityCountDown();
      
    } else if (headerValue === 'parity') {
      intervalId = parityCountDown();
      
    } 
    return () => clearInterval(intervalId);
  }, [headerValue]);
  

  const fastParityCountDown = () => {
    setCountDown({ minutes: '00', seconds: '00' });
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(() => {
     // setActionIndex(!null)
      const currentTime = Date.now() / 1000;
      const distance = 30 - (currentTime % 30);
      const seconds = ('00' + Math.floor(distance % 60)).slice(-2);
      setCountDown({ minutes: '00', seconds });
      if (seconds <= '10' && isManualResult) {
        handleFastParityResult();
      }
    }, 1000);
  };

  const parityCountDown = () => {
    setCountDown({ minutes: '00', seconds: '00' });
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(() => {
      const currentTime = Date.now() / 1000;
      const distance = 180 - (currentTime % 180);
      const minutes = ('00' + Math.floor(distance / 60)).slice(-2);
      const seconds = ('00' + Math.floor(distance % 60)).slice(-2);
      setCountDown({ minutes, seconds });
      if (minutes === '00' && seconds<='30' && isManualResult) {
        handleParityResult();
      }
    }, 1000);
  };

  const handleFastParityResult= async()=>{
    try{
      const data= {color:"red",period:'5678654',time:'899'}
      const response = await axios.get('https://fastwin.vercel.app/get-color-records/fast-parity');
      if(response){
       console.log(response);
      }
    }catch(err){
      console.log(err);
    }
  }
  const handleParityResult=async()=>{
    try{
      const data= "green"
      const response= await axios.post('https://fastwin.vercel.app/color-records/parity',data) ;
      if(response){
       console.log(response);
      }
    }catch(err){
      console.log(err);
    }
  }

  // Additional function to handle the default case



  // Function for conditional rendering
  const renderComponent = () => {
    if (headerValue === 'fast_parity') {
      return <FastPartyComponent countDown={countDown} setActionIndex={setActionIndex} actionIndex={actionIndex}  />;
    } else if (headerValue === 'parity') {
      return <ParityComponent countDown={countDown} />;
    }
    // Add conditions for other cases if needed
    return null; // or render a default component
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5', paddingLeft: '15px', paddingRight: '15px', width: '100%', height: '120vh' }}>
      <WiningHeaderComponent setHeaderValue={setHeaderValue} />
      {renderComponent()}
    </div>
  );
};

export default ManageWining;
