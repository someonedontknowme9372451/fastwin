import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import './page.css';
import BaseApi from '../api/BaseApi';

const Register = () => {
  const BASE_API_URL= BaseApi();
  const navigate = useNavigate();
  const [isChecked] = useState(true);
  const [data, setData] = useState({
    mobile: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',
    otp: '',
  });

  const handleInputChangeEvent = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const isInputDataValid =
    /^\d{10}$/.test(data.mobile.trim()) &&
    data.password.trim().length >= 6 &&
    data.confirmPassword === data.password &&
    /^\d{6}$/.test(data.otp.trim()) &&
    data.inviteCode.trim() !== '';

  const handleRegister = async () => {
    if (isInputDataValid) {
      try {
        const { mobile, password, inviteCode } = data;
        const response = await axios.post(`${BASE_API_URL}/signup`, { mobile, password, inviteCode });

        if (response.data.success) {
          toast.success('User registered successfully', {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'toast-message',
          });
          navigate('/login');
        } else {
          toast.warn(response.data.message, {
            position: toast.POSITION.BOTTOM_CENTER,
            className: 'toast-message',
          });
        }
      } catch (err) {
        handleRegistrationError(err);
      }
    }
  };

  const handleRegistrationError = (error) => {
    if (error.response && error.response.status === 409) {
      toast.warn('User already exists', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-message',
      });
    } else {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-message',
      });
    }
  };


  const back = () => {
    // Handle going back
  };
    
  return (
    <>
    <div>
    <section id='regNav' className='top-nav'>
      <div className='regBack'> 
      <span onClick={back}></span>
      <h3>Register</h3>
      </div>
    </section>
    <section id='regHero'>
      <img src='https://fastwin.one/includes/images/logo.png' alt=''></img>
    </section>
    <section id='regInfo'>
      <div className='infoBox'>
      <img alt='' className='cell'/>
      
      <h3>+91</h3>
      <input type='text' name='mobile' id='mobile' placeholder='Mobile Number' maxLength={10} 
        onChange={handleInputChangeEvent}/>
      </div>
      <div className='infoBox'>
      <img  alt='' className='lock'/>
      <input type='text'  name='password' id='password' placeholder='Login Password (≥6 characters)' maxLength={15} 
        onChange={handleInputChangeEvent} />
      </div>
      <div className='infoBox'>
      <img  alt='' className='lock'/>
      <input type='text' name='confirmPassword' placeholder='Confirm Login Password' maxLength={15}  
      onChange={handleInputChangeEvent}/>
      </div>
      <div className='infoBox'>
      <img  alt='' className='recommendation'/>
      <input type='text' id='invite' name='inviteCode' placeholder='invite Code' maxLength={20} 
        onChange={handleInputChangeEvent}/>
      </div>
      <div className='infoBox'>
      <img  alt='' className='key'/>
      <input type='text' name='otp' placeholder='OTP' maxLength={6} 
      onChange={handleInputChangeEvent}/>
      <button >OTP</button>
      </div>
    </section>
    <section id='regButton'> 
    <button onClick={handleRegister} style={{backgroundColor: isInputDataValid ? '#0093FF' : '#a5a5a5'}}>Register
    {/* { loading ?  <Loader/>: 'Register'} */}
    
    </button>
    </section>
     <section id='regLogin'>
    <h3>Already have an account? <span onClick={()=>{navigate("/login")}}>Log in</span></h3>
     </section>
     <section id='regPrivacy'>
      <input type='checkbox' defaultChecked={isChecked}/>
      <h3>I agree <span>PRIVACY POLICY</span></h3>
     </section>
  
    </div>
    </>
  )
}

export default Register