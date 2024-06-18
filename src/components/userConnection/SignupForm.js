import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

function SignupForm() {
    const { loginWithRedirect } = useAuth0();

    const handleSignup = () => {
        loginWithRedirect();
    };

    return (
        <div>
            <h1>Signup</h1>
            <button onClick={handleSignup}>Signup with Auth0</button>
        </div>
    );
}

export default SignupForm;