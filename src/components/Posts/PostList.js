import React, { useState, useEffect } from "react";
import axios from "../../api";
import { Link } from "react-router-dom";
import "./PostList.css"; // Import the CSS

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // Track if more posts are available
  const aid = localStorage.getItem("aid");
  console.log(aid);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts", {
          params: { search, page, limit },
        });
        setPosts(response.data);
        setError(null);
        setHasMore(response.data.length === limit); // Check if there are more posts
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts. Please try again later.");
      }
    };
    fetchPosts();
  }, [search, page, limit]);

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="post-list-container">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
        className="search-input"
      />
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <ul className="post-grid">
            {posts.map((post) =>
              aid === post.author._id ? (
                <li key={post._id} className="post-item blue">
                  <Link to={`/posts/${post._id}`} className="post-link">
                    {post.title}
                  </Link>
                </li>
              ) : (
                <li key={post._id} className="post-item ">
                  <Link to={`/posts/${post._id}`} className="post-link">
                    {post.title}
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className="pagination-controls">
            <button
              onClick={handlePrevious}
              className="pagination-button"
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="pagination-button"
              disabled={!hasMore}
            >
              Next
            </button>
          </div>
          {!hasMore && (
            <div className="end-message">
              You've reached the end of the list.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
