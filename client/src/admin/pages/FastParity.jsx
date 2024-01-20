import './page.css'
import { useEffect, useState } from "react";
import CountDown from '../components/CountDown';
import ProgressBarComponents from '../components/ProgressBarComponents';
import ToggleButton from '../components/ToggleButton';

const FastParity = () => {
    const [fastParityCountDown, setFastParityCountDown] = useState('00');
    const [isAutoSelect, setIsAutoSelect] = useState(true);
    const [checkValue, setCheckValue] = useState('')
    const value1 = 10;
    const value2 = 10;
    const value3 = 78;

    useEffect(() => {
        const intervalId = setInterval(() => {
            const countDownDate = Date.now() / 1000;
            const distance = 30 - (countDownDate % 30);
            const seconds = ('0' + Math.floor(distance % 60)).slice(-2);
            setFastParityCountDown(seconds);
            if (seconds <= '08' && isAutoSelect) {
              // Run only once when countdown is 8 seconds or below
              chooseColor();
              // Disable auto selection after running once
              setIsAutoSelect(false);
          }
           
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isAutoSelect]);

    const chooseColor = () => {  
        if (value1 > value2 && value1 > value3) {
           setCheckValue('option1')
        } else if (value2 > value1 && value2 > value3) {
           setCheckValue('option2')
        } else {
           setCheckValue('option3') 
        }
    }

    return (
        <div className='admin'>
            <h1 style={{ textAlign: 'center' }}>Fast Parity</h1>
            <ToggleButton/>
            <CountDown countdown={fastParityCountDown} period={34556788} />
            <ProgressBarComponents value1={value1} value2={value2} value3={value3} option={checkValue}/>
        </div>
    )
}

export default FastParity;
