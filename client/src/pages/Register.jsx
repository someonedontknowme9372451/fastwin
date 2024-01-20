import './page.css';
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Register = () => {
  const navigate= useNavigate();
  const [isChecked] = useState(true);
  const [data, setData] = useState({mobile:"",password:"",confirmPassword:"",inviteCode:"",otp:""})
  function back(){

  }
  function handleInputChange(event){
      setData({...data,[event.target.name]:event.target.value});
  }
  const isInputDataValid =
    data.mobile.trim().length === 10 &&
    data.password.trim().length >= 6 &&
    data.confirmPassword===data.password &&
    data.otp.trim().length >= 6 &&
    data.inviteCode.trim() !==''

  const handleRegister =async()=>{
      if(isInputDataValid){
     try{
      const allData= {mobile:data.mobile,password:data.password,inviteCode:data.inviteCode}
       const response =await axios.post('http://localhost:3000/user',allData);
       if(response){
         navigate('/login')
       }
     }catch(err){
      if(err.response.data.error.code===11000){
        toast.warning("user already exist",{
          position: toast.POSITION.BOTTOM_CENTER,
          className:"toast-message"
          })
        // alert(" user all ready exist")
      }
      // console.log(err)
      toast.error(err,{
        position: toast.POSITION.BOTTOM_CENTER,
        className:"toast-message"
        });
     }

      }
  }

  const sendSMS = async () => {
    const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
    const otp=generateOTP()
    toast.error(otp,{
      position: toast.POSITION.BOTTOM_CENTER,
      className:"toast-message"
      })
    // alert(otp)
    }
    

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
      <img src='https://fastwin.app/includes/images/logo.png' alt=''></img>
    </section>
    <section id='regInfo'>
      <div className='infoBox'>
      <img alt='' className='cell'/>
      
      <h3>+91</h3>
      <input type='text' name='mobile' id='mobile' placeholder='Mobile Number' maxLength={10} 
        onChange={handleInputChange}/>
      </div>
      <div className='infoBox'>
      <img  alt='' className='lock'/>
      <input type='text'  name='password' id='password' placeholder='Login Password (≥6 characters)' maxLength={15} 
        onChange={handleInputChange} />
      </div>
      <div className='infoBox'>
      <img  alt='' className='lock'/>
      <input type='text' name='confirmPassword' placeholder='Confirm Login Password' maxLength={15}  
      onChange={handleInputChange}/>
      </div>
      <div className='infoBox'>
      <img  alt='' className='recommendation'/>
      <input type='text' id='invite' name='inviteCode' placeholder='invite Code' maxLength={20} 
        onChange={handleInputChange}/>
      </div>
      <div className='infoBox'>
      <img  alt='' className='key'/>
      <input type='text' name='otp' placeholder='OTP' maxLength={6} 
      onChange={handleInputChange}/>
      <button onClick={sendSMS} >OTP</button>
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