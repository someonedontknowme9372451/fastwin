import './page.css';
import  { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
 const [data, setData] = useState({mobile:"",password:""})
 const navigate= useNavigate();
  function handleInput(event){
    setData({ ...data, [event.target.name]: event.target.value });
  }
  const isInputDataValid =
    data.mobile.trim() !== '' &&
    data.password.trim() !== '' &&
    data.mobile.trim().length === 10 &&
    data.password.trim().length >= 6;



const handleLogin = async () => {
  if (isInputDataValid) {
    setData({ mobile: data.mobile, password: data.password });
    try {
      const response = await axios.post("http://localhost:3000/login",data);
      if(response){
        navigate('/')
        // alert("Login successful!");
      }
    } catch (error) {
      if(error.response.status===500){
        // alert("user not exist");
        toast.warning("user not exist",{
          position: toast.POSITION.BOTTOM_CENTER,
          className:"toast-message"
          })
      }
      if(error.response.status===501){
        // alert("wrong password");
        toast.warning("wrong password",{
          position: toast.POSITION.BOTTOM_CENTER,
          className:"toast-message"
          })
      }
  }
}
};

  return (
    <>
    <div>
      <section id='logNav' className='top-nav'>
       <div className='logback'><span></span>  <h3>Login</h3></div>
       
      </section>

      <section id='logHero'>
        <img src='https://fastwin.app/includes/images/logo.png' alt='Logo' height={56}></img>
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
        {/* <button style={buttonStyles} onClick={handleLogin}>
          {loading ?  <Loader/>: 'Login'}
        </button> */}
        <button onClick={handleLogin} style={{backgroundColor: isInputDataValid ? '#0093FF' : '#a5a5a5'}}>
          Login
        </button>
      </section>
      <section id='logButtons'>
        <div className="logbtn"><button onClick={()=>{navigate('/register')}}>Create an account</button></div>
        <div className="logbtn"><button onClick={()=>{navigate('/forgot')}}>Forgot Password?</button></div>
      </section>
    </div>
     
    </>
  )
}

export default Login