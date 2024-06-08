import axios from 'axios';
import {postData} from "./components/tools/requests";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
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
    }
    return Promise.reject(error);

});

export default axiosInstance;