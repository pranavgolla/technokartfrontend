import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate as useHistory } from 'react-router-dom';
import './AuthForm.css'; // Import the CSS

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('reader');
    const [error, setError] = useState(''); // State for error messages
    const { register } = useContext(AuthContext);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            await register({ username, password, role });
            history('/');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="form-input">
                    <option value="reader">Reader</option>
                    <option value="author">Author</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            <button type="submit" className="auth-button">Register</button>
        </form>
    );
};

export default Register;
