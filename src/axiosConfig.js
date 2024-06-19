import axios from 'axios';
import {postData} from "./components/tools/requests";
import {getUserId, setUserId} from "./auth";
import {getToken} from "./auth";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
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

axiosInstance.interceptors.response.use(request => request, error => {
    if (error.response.status === 401) {
        const token = localStorage.getItem('token');
        postData('/api/auth/refreshToken', {token}, (response) => {
            localStorage.setItem('token', response.token);
            return axiosInstance.request(error.config);
        });
        return Promise.reject(error);
    }
    else {
        return Promise.reject(error);
    }
});

axiosInstance.interceptors.response.use((response) => {
    if (response.status === 206) {
        const userId = response.headers['userid'] ? response.headers['userid'] : response.headers['UserId'];
        setUserId(userId);
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;