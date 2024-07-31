import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostForm from './components/Posts/PostForm';
import PostDetail from './components/Posts/PostDetail';
import AuthProvider from './context/AuthContext';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/posts/create" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
                    <Route path="/posts/edit/:id" element={<ProtectedRoute><PostForm /></ProtectedRoute>} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
