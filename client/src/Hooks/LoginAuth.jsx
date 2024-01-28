import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseApi from '../api/BaseApi';

const LoginAuth = () => {
    const navigate = useNavigate();
    const BASE_API_URL= BaseApi();
    const [user, setUser] = useState(null);
    const [cookies] = useCookies(['token']);
  
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                if (!cookies.token) {
                    throw new Error('Token not found');
                }

                const response = await axios.post(`${BASE_API_URL}/`, {});

                if (!response.data || !response.data.user) {
                    throw new Error('Authentication failed');
                }
                

                setUser(response.data.user);
            } catch (error) {
                if (error.response.statusCode === 401) {
                    navigate('/login');
                } else {
                    console.error('Error checking authentication:', error);
                }
            }
        };
    
        checkAuthentication();
    }, [cookies.token, navigate,BASE_API_URL]);
    
    return user;
};

export default LoginAuth;
