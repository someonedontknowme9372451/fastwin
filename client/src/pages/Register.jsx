import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './page.css';
import BaseApi from '../api/BaseApi';
import ToastMessage from '../components/ToastMessage';
import loadingImg from '../assets/images/download.png';

const Register = () => {
  const BASE_API_URL = BaseApi();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSuccessToast, setIsSuccessToast] = useState(true);
  const [isChecked, setIsChecked] = useState(true); // Added state for checkbox

  const [data, setData] = useState({
    mobile: '',
    password: '',
    confirmPassword: '',
    inviteCode: '0',
    otp: '',
  });

  useEffect(() => {
    const keyValue = new URLSearchParams(window.location.search).get('invite');
    if (keyValue) {
      setData(prevData => ({ ...prevData, inviteCode: keyValue }));
    }
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const isInputDataValid = () => {
    const { mobile, password, confirmPassword, otp, inviteCode } = data;
    return (
      /^\d{10}$/.test(mobile.trim()) &&
      password.trim().length >= 6 &&
      confirmPassword === password &&
      /^\d{6}$/.test(otp.trim()) &&
      inviteCode.trim() !== ''
    );
  };

  const handleRegister = async () => {
    if (!isInputDataValid()) return;

    setIsLoading(true);
    try {
      const { mobile, password, inviteCode } = data;
      const response = await axios.post(`${BASE_API_URL}/signup`, { mobile, password, inviteCode });
      setIsLoading(false);

      if (response.data.success) {
        toast('User registered successfully', true);
        setTimeout(() => navigate('/login'), 1000);
      } else {
        toast(response.data.message, false);
      }
    } catch (error) {
      setIsLoading(false);
      handleRegistrationError(error);
    }
  };

  const handleRegistrationError = error => {
    if (error.response && error.response.status === 409) {
      toast('User already exists', false);
    } else {
      toast(error.message, false);
    }
  };

  const toast = (message, isSuccess) => {
    setToastMessage(message);
    setIsSuccessToast(isSuccess);
    setShowToast(true);
  };

  const handleCloseToast = () => setShowToast(false);

  const buttonStyle = {
    backgroundColor: isInputDataValid() ? '#0093FF' : '#a5a5a5',
    pointerEvents: isInputDataValid() ? 'all' : 'none'
  };

  const back = () => {
    navigate(-1)
  };

  return (
    <div>
      <section id="regNav" className="top-nav">
        <div className="regBack">
          <span onClick={back}></span>
          <h3>Register</h3>
        </div>
      </section>
      <section id="regHero">
        <img src="https://fastwin.one/includes/images/logo.png" alt="" />
      </section>
      <section id="regInfo">
        <div className="infoBox">
          <img alt="" className="cell" />
          <h3>+91</h3>
          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder="Mobile Number"
            maxLength={10}
            onChange={handleInputChange}
          />
        </div>
        <div className="infoBox">
          <img alt="" className="lock" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Login Password (≥6 characters)"
            maxLength={15}
            onChange={handleInputChange}
          />
        </div>
        <div className="infoBox">
          <img alt="" className="lock" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Login Password"
            maxLength={15}
            onChange={handleInputChange}
          />
        </div>
        <div className="infoBox">
          <img alt="" className="recommendation" />
          <input
            type="text"
            id="invite"
            name="inviteCode"
            placeholder="Invite Code"
            maxLength={20}
            onChange={handleInputChange}
            value={data.inviteCode}
          />
        </div>
        <div className="infoBox">
          <img alt="" className="key" />
          <input
            type="text"
            name="otp"
            placeholder="OTP"
            maxLength={6}
            onChange={handleInputChange}
          />
          <button>OTP</button>
        </div>
      </section>
      <section id="regButton">
        <button onClick={handleRegister} style={buttonStyle} >
          {!isLoading ? 'Register' : <img src={loadingImg} alt="Loading" height={30} className='loading-img' />}
        </button>
      </section>
      <section id="regLogin">
        <h3>
          Already have an account? <span onClick={() => navigate("/login")}>Log in</span>
        </h3>
      </section>
      <section id="regPrivacy">
        <input
          type="checkbox"
          defaultChecked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)} // Update isChecked state
        />
        <h3>
          I agree <span>PRIVACY POLICY</span>
        </h3>
      </section>
      {showToast && <ToastMessage isSuccess={isSuccessToast} message={toastMessage} onClose={handleCloseToast} autoCloseTimeout={5000} />}
    </div>
  );
};

export default Register;
