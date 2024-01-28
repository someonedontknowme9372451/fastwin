import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './page.css';
import FastPartyComponent from '../components/FastPartyComponent';
import WiningHeaderComponent from '../components/WiningHeaderComponent';
import ParityComponent from '../components/ParityComponent';
import BaseApi from '../../api/BaseApi';

const API_BASE_URL = BaseApi()

const ManageWining = () => {
  const [headerValue, setHeaderValue] = useState('fast_parity');
  const [countDown, setCountDown] = useState({ minutes: '00', seconds: '00' });
  const intervalIdRef = useRef(null);
  const [actionIndex, setActionIndex] = useState(null);
  const [isManualResult, setIsManualResult] = useState(true);

  useEffect(() => {
    let intervalId;

    const clearAndSetInterval = (callback, interval) => {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = setInterval(callback, interval);
    };

    if (headerValue === 'fast_parity') {
      clearAndSetInterval(fastParityCountDown, 1000);
    } else if (headerValue === 'parity') {
      clearAndSetInterval(parityCountDown, 1000);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [headerValue, actionIndex, isManualResult]);

  const colorIndex = {
    0: 'red+violet',
    1: 'green',
    2: 'red',
    3: 'green',
    4: 'red',
    5: 'green+violet',
    6: 'red',
    7: 'green',
    8: 'red',
    9: 'green'
  };

  const handleResult = async (endpoint) => {
    try {
      if (actionIndex !== null) {
        const color = colorIndex[actionIndex];
        console.log(`Processing action index ${actionIndex} with color ${color}`);

        const data = {
          color,
          period: '5',
          time: new Date(),
          number: actionIndex
        };

        const response = await axios.post(`${API_BASE_URL}/api/v1/${endpoint}`, data);
        console.log('API Response:', response);
      } else {
        console.warn('Invalid actionIndex: Action index is null.');
      }
    } catch (error) {
      console.error('Error processing action index:', error);
    }

    // Use setTimeout with clearInterval to delay resetting actionIndex
    setTimeout(() => {
      setActionIndex(null);
    }, 3000);
  };

  const fastParityCountDown = () => {
    const currentTime = Date.now() / 1000;
    const distance = 30 - (currentTime % 30);
    const seconds = ('00' + Math.floor(distance % 60)).slice(-2);
    setCountDown({ minutes: '00', seconds });

    if (seconds === '03' && isManualResult) {
      handleResult('fastParity');
    }
  };

  const parityCountDown = () => {
    const currentTime = Date.now() / 1000;
    const distance = 180 - (currentTime % 180);
    const minutes = ('00' + Math.floor(distance / 60)).slice(-2);
    const seconds = ('00' + Math.floor(distance % 60)).slice(-2);
    setCountDown({ minutes, seconds });

    if (minutes === '00' && seconds <= '30' && isManualResult) {
      handleResult('parity');
    }
  };

  const renderComponent = () => {
    switch (headerValue) {
      case 'fast_parity':
        return <FastPartyComponent countDown={countDown} setActionIndex={setActionIndex} actionIndex={actionIndex} />;
      case 'parity':
        return <ParityComponent countDown={countDown} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5', padding: '15px', width: '100%', height: '120vh' }}>
      <WiningHeaderComponent setHeaderValue={setHeaderValue} />
      {renderComponent()}
    </div>
  );
};

export default ManageWining;
