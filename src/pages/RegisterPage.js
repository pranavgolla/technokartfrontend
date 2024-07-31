import React from 'react';
import Register from '../components/Auth/Register';

const RegisterPage = () => {
    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">Register</h1>
                <Register/>
            </div>
        </div>
    );
};

export default RegisterPage;
