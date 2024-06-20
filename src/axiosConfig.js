import axios from 'axios';
import {getToken, getUserId, setUserId} from "./auth";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((request) => {
    const token = getToken();
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    if (getUserId() != null) {
        request.headers['UserId'] = getUserId();
    }
    return request;
});

axiosInstance.interceptors.response.use((response) => {
    if (response.status === 206) {
        const userId = response.headers['userid'] ? response.headers['userid'] : response.headers['UserId'];
        setUserId(userId);
    }
    return response;
}, (error) => {
    if (error.response && error.response.status === 304) {
        const userId = error.response.headers['userid'] ? error.response.headers['userid'] : error.response.headers['UserId'];
        setUserId(userId);
    }
    return Promise.reject(error);
});



export default axiosInstance;