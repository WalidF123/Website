import './App.css';

import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from './fragments/footer';
import Header from './fragments/header';
import Navbar from './fragments/navbar';

import DietPlan from './pages/DietPlan';
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProfile from "./pages/myProfile";
import Products from './pages/products';
import SignUp from './pages/Signup';

import { createUser, getUser, removeUser } from "./data/repository";

function App() {
  const [username, setUsername] = useState(getUser());

  const loginUser = (username) => {
    setUsername(username);
  }

  const logoutUser = () => {
    removeUser();
    setUsername(null);
  }

  const signUpUser = (username, password) => {
    const created = createUser(username, password);
    if (created === true) {
      setUsername(username);
    } else {
      // Handle error if user creation fails
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header />
        <Navbar username={username} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home username={username} />} />
              <Route path="/products" element={<Products></Products>} />
              <Route path="/login" element={<Login loginUser={loginUser} />} />
              <Route path="/signup" element={<SignUp signUpUser={signUpUser} />} /> {/* Route for the sign-up page */}
              <Route path="/profile" element={<MyProfile username={username} />} />
              <Route path="/DietPlan" element={<DietPlan />} />

            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
  


export default App;
