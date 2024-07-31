import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../api';
import './CommentList.css'; // Import CSS file

const CommentList = ({ postId }) => {
    const { token, isAuthenticated } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchComments = async () => {
            try {
                const response = await axios.get(`/comments/${postId}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error.message);
            }
        };
        fetchComments();
    }, [postId, isAuthenticated, navigate,comments]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            return; // Prevent submission if content is empty
        }

        try {
            const response = await axios.post(
                '/comments',
                { postId, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComments([...comments, response.data]);
            setContent('');
        } catch (error) {
            console.error('Error adding comment:', error.response?.data || error.message);
        }
    };

    return (
        <div className="comment-list">
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button type="submit">Add Comment</button>
            </form>
            <ul className="comments">
                {comments.map((comment) => (
                    <li key={comment._id} className="comment-item">
                        <strong>{comment.author.username}:</strong> {comment.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
