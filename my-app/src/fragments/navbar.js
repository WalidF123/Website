import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg"; // Assuming your logo image is stored in the "assets" folder
function Navbar(props) {
  return ( 
    <nav className="navbar navbar-expand-lg navbar-light transparent-bg" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
        <img src={logo} alt="React Logo" width="50" height="50"  />
        </Link>
        <span style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'Cursive', color: '#333',marginRight: '50px' }}>SOIL</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: 'black' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" style={{ color: 'black' }}>Products</Link>
            </li>
            {props.username !== null &&
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile" style={{ color: 'black' }}>My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/forum" style={{ color: 'black' }}>Forum</Link>
                </li>
              </>
            }
          </ul>
          <ul className="navbar-nav">
            {props.username === null ?
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ color: 'black' }}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style={{ color: 'black' }}>Sign Up</Link>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">Welcome, {props.username}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link" to="/login" onClick={props.logoutUser}>Logout</button>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
