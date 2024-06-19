import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import LoginButton from "../UI/LoginButton";

function LoginForm() {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect();
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginButton/>
       </div>
    );
}

export default LoginForm;