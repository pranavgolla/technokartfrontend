import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css"; // Import the CSS

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const role = localStorage.getItem("role");

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            MyApp
          </Link>
          <div className="navbar-links">
            {isAuthenticated ? (
              <>
                <Link to="/" className="navbar-link">
                  Home
                </Link>
                {role !== "reader" && (
                  <Link to="/posts/create" className="navbar-link">
                    Create Post
                  </Link>
                )}
                <button onClick={logout} className="navbar-button">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
                <Link to="/register" className="navbar-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
