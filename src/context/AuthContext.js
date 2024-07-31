import React, { createContext, useState, useEffect } from 'react';
import axios from '../api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = async (credentials) => {
        const response = await axios.post('/login', credentials);
        setToken(response.data.token);
        // console.log(response.data)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role',response.data.role)
        localStorage.setItem('aid',response.data.id)

        setIsAuthenticated(true);
    };

    const register = async (credentials) => {
        const response = await axios.post('/register', credentials);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role',response.data.role)
        localStorage.setItem('aid',response.data.id)
        setIsAuthenticated(true);
    };

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('role')
        localStorage.removeItem('aid')
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
