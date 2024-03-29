import React from "react";
import logo from "../assets/logo.jpeg";

function Home(props) {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 mb-4">Welcome to <b>my humble abode</b></h1>
      <div className="row">
        <div className="col-md-6">
          <img src={logo} className="img-fluid" alt="Logo" width="400" length="400" />
        </div>
        <div className="col-md-6">
          <h2>About Me</h2>
          <p>
            My name is Walid Feki and I am a student at the university of RMIT. Who am I really though? I play a range of sports
            tennis,basketball,soccer etc but am I an athlete? I believe education is important and vital for everyone but I do not think of myself as 
            a scholar. This websites purpose is going to be redefined everyday as I learn more and more about web development and get more experience I 
            will display them on this site.
          </p>
         
          <a href="/products" className="btn btn-primary">Cool things</a>
        </div>
      </div>

      <hr />
     


    </div>
  );
}

export default Home;
