import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            if (response.status === 200) {
                onLogin();
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    const handleSwitchToSignup = () => {
        navigate('/signup');
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
                <br/>
                <button onClick={handleSwitchToSignup}>Switch to Signup</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginForm;