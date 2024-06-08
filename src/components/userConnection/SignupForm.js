import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authenticate} from "../tools/requests";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';
import { FormControl } from '@mui/material';

function SignupForm({onSignup}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate(
            '/api/auth/register',
            { username, password },
            (response) => {
                onSignup();
                navigate('/login');
            },
            (err) => {
                setError('Signup failed');
            }
        );
    };

    const handleSwitchToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <Typography variant="h1">Signup</Typography>
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
                <Button type="submit" variant="contained" color="primary">Signup</Button>
                <br/>
                <Button onClick={handleSwitchToLogin} variant="contained" color="primary">Switch to Login</Button>
            </FormControl>
            {error && <p>{error}</p>}
        </div>
    );
}

export default SignupForm;