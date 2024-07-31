import React from 'react';
import Login from '../components/Auth/Login';
import './LoginPage.css'; // Import the CSS

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <Login />
            </div>
        </div>
    );
};

export default LoginPage;
