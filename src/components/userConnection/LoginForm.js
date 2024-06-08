import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authenticate} from "../tools/requests";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

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
            <Typography variant="h1">Login</Typography>
            <FormControl onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <TextField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <Button type="submit" variant="contained" color="primary">Login</Button>
                <br/>
                <Button onClick={handleSwitchToSignup} variant="contained" color="primary">Switch to Signup</Button>
            </FormControl>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginForm;