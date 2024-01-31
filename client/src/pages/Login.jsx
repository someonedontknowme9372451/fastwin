import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseApi from '../api/BaseApi';
import loadingImg from '../assets/images/download.png'
import ToastMessage from '../components/ToastMessage'

const Login = () => {
  const BASE_API_URL = BaseApi();
  const [formData, setFormData] = useState({ mobile: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSuccessToast, setIsSuccessToast] = useState(true);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidInput = () => {
    const { mobile, password } = formData;
    return mobile.trim() !== '' && password.trim() !== '' && mobile.length === 10 && password.length >= 6;
  };


  const buttonStyle = {
    backgroundColor: isValidInput() ? '#0093FF' : '#a5a5a5',
    pointerEvents: isValidInput() ? 'all' : 'none'
  };


  const handleLogin = async () => {
    if (isValidInput()) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${BASE_API_URL}/login`, formData);
        if (response.data.success) {
          setIsLoading(false);
          navigate('/');
        }
      } catch (error) {
        setIsLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
          toast(error.response.data.message,false)
        } else {
          toast('An error occurred. Please try again later.',false)
        }
      }
    }
  };


  const toast =(message,isSuccess)=>{
    setToastMessage(message);
    setIsSuccessToast(isSuccess);
    setShowToast(true);
  }
  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
    <div>
      <section id='logNav' className='top-nav'>
       <div className='logback'><span></span>  <h3>Login</h3></div>
       
      </section>

      <section id='logHero'>
        <img src='https://fastwin.one/includes/images/logo.png' alt='Logo' height={56}></img>
      </section>
      <section id='logInput'>
        <div className='inpLog input-box' >
        <span className='cell'></span>
          <input
            type='text'
            name='mobile'
            id='mobile'
            placeholder='Mobile Number'
            maxLength={10}
            onChange={handleInput}
          />
        </div>
        <div className='inpLog input-box'>
          <span className='lock'></span>
          <input
            type='password' // Set input type to password for security
            name='password'
            id='password'
            placeholder='Password (≥6 characters)'
            maxLength={15}
            onChange={handleInput}
          />
        </div>
      </section>
      <section id='logButton'>
  
        <button onClick={handleLogin} style={buttonStyle}>
          {!isLoading ? 'Login':<img src={loadingImg}  alt="Loading" height={30} className='loading-img'/> }
        </button>
      </section>
      <section id='logButtons'>
        <div className="logbtn"><button onClick={()=>{navigate('/register')}}>Create an account</button></div>
        <div className="logbtn"><button onClick={()=>{navigate('/forgot')}}>Forgot Password?</button></div>
      </section>
      {showToast && <ToastMessage isSuccess={isSuccessToast} message={toastMessage} onClose={handleCloseToast} autoCloseTimeout={5000} />}
    </div>
     
    </>
  )
}

export default Login