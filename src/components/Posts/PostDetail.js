import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api";
import { AuthContext } from "../../context/AuthContext";
import CommentList from "../Comments/CommentList";
import { useNavigate } from "react-router-dom";
import './PostDetail.css'; // Import the CSS

const PostDetail = () => {
  const { id } = useParams();
  const { token, isAuthenticated } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const aid = localStorage.getItem("aid");
  

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };
    fetchPost();
  }, [id, isAuthenticated, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  if (!post) return <div className="loading">Loading...</div>;

  const renderActionButtons = () => {
    if (post.author._id === aid) {
      return (
        <>
          <Link to={`/posts/edit/${post._id}`} className="btn btn-edit">Edit</Link>
          <button onClick={handleDelete} className="btn btn-delete">Delete</button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="post-detail">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        {role === "admin" && (
          <>
            <Link to={`/posts/edit/${post._id}`} className="btn btn-edit">Edit</Link>
            <button onClick={handleDelete} className="btn btn-delete">Delete</button>
          </>
        )}
        {role === 'author' && renderActionButtons()}
      </div>
      <CommentList postId={post._id} />
    </div>
  );
};

export default PostDetail;
