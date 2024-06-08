import React, {useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginForm from "./components/userConnection/LoginForm";
import SignupForm from "./components/userConnection/SignupForm";
import Dashboard from "./components/UI/Dashboard";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = () => {
        setIsAuthenticated(true);
        setSuccessMessage('Login successful!');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        setIsAuthenticated(false);
        setSuccessMessage('');
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard"/> : <LoginForm onLogin={handleLogin}/>}/>
                    <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard"/> : <SignupForm onSignup={handleLogin}/>}/>
                    <Route path="/dashboard"
                           element={isAuthenticated ?
                               <Dashboard onLogout={handleLogout} successMessage={successMessage}/> :
                               <Navigate to="/login"/>}/>
                    <Route path="/" element={<Navigate to="/login"/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
