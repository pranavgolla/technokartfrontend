import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api";
import { useNavigate } from "react-router-dom";
import "./PostForm.css"; // Import the CSS

const PostForm = ({ post }) => {
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [status, setStatus] = useState(post ? post.status : "draft");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (post) {
        await axios.put(
          `/posts/${post._id}`,
          { title, content, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "/posts",
          { title, content, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      navigate("/");
    } catch (error) {
      console.error(
        "Error submitting post:",
        error.response?.data || error.message
      );
    }
  };

  if (role === "reader") return null; // Prevent form rendering for readers

  return (
    <div className="c1">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button type="submit">{post ? "Update" : "Create"} Post</button>
      </form>
    </div>
  );
};

export default PostForm;
