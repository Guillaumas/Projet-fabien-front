import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authenticate} from "../tools/requests";
import LoginButton from "../UI/LoginButton";


function LoginForm({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate(
            '/api/auth/login',
            { username, password },
            (response) => {
                localStorage.setItem('token', response.data.token);
                onLogin();
                navigate('/dashboard');
            },
            (err) => {
                setError('Login failed');
            }
        );
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
                <LoginButton/>
                <br/>
                <button onClick={handleSwitchToSignup}>Switch to Signup</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginForm;