import React, {useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginForm from "./components/userConnection/LoginForm";
import SignupForm from "./components/userConnection/SignupForm";
import Dashboard from "./components/UI/Dashboard";
import {useAuth0} from '@auth0/auth0-react';

function App() {
    const { isAuthenticated, logout } = useAuth0();
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogout = () => {
        logout();
        setSuccessMessage('');
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={!isAuthenticated ? <LoginForm/> : <Navigate to="/dashboard"/>}/>
                    <Route path="/signup" element={!isAuthenticated ? <SignupForm/> : <Navigate to="/dashboard"/>}/>

                    <Route path="/dashboard"
                           element={isAuthenticated ?
                               <Dashboard onLogout={handleLogout} successMessage={successMessage}/> :
                               <Navigate to="/login"/>}/>
                    <Route path="/" element={!isAuthenticated ? <LoginForm/> : <Navigate to="/dashboard"/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;