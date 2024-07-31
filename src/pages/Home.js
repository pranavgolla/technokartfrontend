import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PostList from '../components/Posts/PostList';
import './Home.css';

const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login page if not authenticated
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="home-container">
            <h1>Blog Posts</h1>
            <PostList />
        </div>
    );
};

export default Home;
