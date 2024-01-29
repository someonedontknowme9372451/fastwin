import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseApi from '../api/BaseApi';

const LoginAuth = () => {
    const navigate = useNavigate();
    const BASE_API_URL = BaseApi();
    const [user, setUser] = useState(null);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                if (!cookies.token) throw new Error('Token not found');

                const response = await axios.post(`${BASE_API_URL}/`, {});
                if (!response.data || !response.data.user) throw new Error('Authentication failed');

                setUser(response.data.user);
            } catch (error) {
                if (!cookies.token) {
                    navigate('/login');
                    console.log('token not found');
                } 
                else if (axios.isAxiosError(error)) {
                    console.error('Network error:', error.message);
                } else if (error.response) {
                   console.error('Server error:', error.response.data.message);
                } else {
                    console.error('Other error:', error.message);
                }
            }
        };

        checkAuthentication();
    }, [cookies.token, navigate, BASE_API_URL]);

    return user;
};

export default LoginAuth;
