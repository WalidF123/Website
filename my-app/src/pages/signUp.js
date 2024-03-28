import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../data/repository";

function SignUp(props) {
  const [formData, setFormData] = useState({ email: "", password: "", name: "", confirmPassword: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const isStrongPassword = (password) => {
    // Validation of strong password, from searching
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, name, confirmPassword } = formData;
    if (!email || !password || !name || !confirmPassword) {
      setErrorMessage("Please provide all required information.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }
    if (!isStrongPassword(password)) {
      setErrorMessage("Password is not strong enough. Please include at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.");
      return;
    }
    // Get the date of signing in using date method
    const dateOfJoining = new Date().toISOString().slice(0, 10); 

    const created = await createUser(email, password, name,dateOfJoining);
    if (created) {
      // Redirect to login page after successful sign-up
      navigate("/login");
    } else {
      console.log("Failed to create user. Please try again.");
      setErrorMessage("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <hr />
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
          />
        </div>
        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default SignUp;



