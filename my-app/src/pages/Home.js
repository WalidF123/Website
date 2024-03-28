import React from "react";
import logo from "../assets/logo.jpeg";
import Specials from './Specials';
import SmallScaleFarming from './smallScale';

function Home(props) {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 mb-4">Welcome to <b>SOIL</b></h1>
      <div className="row">
        <div className="col-md-6">
          <img src={logo} className="img-fluid" alt="Logo" width="400" length="400" />
        </div>
        <div className="col-md-6">
          <h2>About SOIL</h2>
          <p>
            We are SOIL a long-term organic food grocer
            with several store locations around Melbourne. We focus on bringing premium, 
            organic fresh food to the community. 
          </p>
          <p>
            In addition to being food grocers, 
            we offer face to face seminars on diet, nutrition, and small-scale organic farming
          </p>
          <a href="/products" className="btn btn-primary">Explore Organic Products</a>
        </div>
      </div>

      <hr />
      <Specials />
      <SmallScaleFarming />

      {/* Add more sections or components as needed */}

    </div>
  );
}

export default Home;
