import { FaUser } from "react-icons/fa";
import { getUser, getUsers } from "../data/repository";

import React, { useState } from "react";
import { removeUser, updateUser } from "../data/repository";
import Subscription from './subscriptions';


function MyProfile() {
  //get user information and store it in variables
  const users = getUsers();
  const userEmail = getUser();
  //find the current user
  const currentUser = users.find(user => user.email === userEmail);
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...currentUser });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //only changes name FOR NOW (Will add more features to change) 
    //TODO Add more features
    const updatedData = { ...currentUser, name: formData.name, bio: formData.bio, gender: formData.gender,dob:formData.dob ,age: formData.age }; 
    //update user function 
    //This function has been added to the repository.js
    const updated = await updateUser(updatedData); 
    if (updated) {
      //VISUAL CUE if successful
      setEditMode(false);
    }
  };




  //DELETE FEATURE
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      const deleted = await removeUser();
      if (deleted) {
        // Provide visual cue upon successful delete
        window.alert("Your account has been deleted.");
        // Redirect to the home page
        window.location.href = "/";
      } else {
        window.alert("Error deleting your account. Please try again.");
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "30px", borderRadius: "15px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", border: "1px solid #ccc",
    maxWidth: "600px",margin: "auto"}}>
      <div style={{ backgroundColor: "#87A96B",padding: "15px",borderRadius: "10px",
      textAlign: "center",marginBottom: "30px",fontSize: "24px",fontWeight: "bold" }}>User Profile</div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px"}}>
          <div style={{ width: "80px", height: "80px", backgroundColor: "#87A96B", borderRadius: "50%", 
          display: "flex", justifyContent: "center", alignItems: "center",marginRight: "20px"}}>
              <FaUser size={60}/>
          </div>
          <div>
              {currentUser ? (
                  <>
                      {editMode ? (
                          <form onSubmit={handleSubmit}>
                              <div className="form-group">
                                  <label htmlFor="name">Name:</label>
                                  <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      placeholder="Enter your name"
                                      style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }}
                                  />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="bio">Bio:</label>
                                  <textarea
                                      id="bio"
                                      name="bio"
                                      value={formData.bio}
                                      onChange={handleInputChange}
                                      placeholder="Enter your bio"
                                      style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }}
                                  />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="gender">Gender:</label>
                                  <select
                                      id="gender"
                                      name="gender"
                                      value={formData.gender}
                                      onChange={handleInputChange}
                                      style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }}
                                  >
                                      <option value="">Select gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                  </select>
                              </div>
                              <div className="form-group">
                                  <label htmlFor="dob">Date of Birth:</label>
                                  <input 
                                      type="date" 
                                      id="dob" 
                                      name="dob" 
                                      value={formData.dob} 
                                      onChange={handleInputChange} 
                                      style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px" }}
                                  />
                              </div>
                              <div className="form-group" style={{ display: "flex", justifyContent: "space-between" }}>
                                  <button type="submit" style={{ backgroundColor: "#8bd8b3", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>Save</button>
                                  <button type="button" onClick={() => setEditMode(false)} style={{ backgroundColor: "#f67280", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>Cancel</button>
                              </div>
                          </form>
                      ) : (
                          <>
                              <h2>{currentUser.name}</h2>
                              <p><b>Bio:</b> {currentUser.bio}</p>
                              <p><b>Email:</b> {currentUser.email}</p>
                              {currentUser.dob && <p><b>Date of Birth: </b>{currentUser.dob}</p>}
                              <p><b>Date of Joining:</b> {currentUser.dateOfJoining}</p>
                              <p><b>Gender:</b> {currentUser.gender}</p>
                              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                                  <button onClick={() => setEditMode(true)} style={{ backgroundColor: "#87A96B", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>Edit</button>
                                  <button onClick={handleDelete} style={{ backgroundColor: "#f67280", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none" }}>Delete</button>
                              </div>
                          </>
                      )}
                  </>
              ) : (
                  <p style={{ color: "#f67280" }}>No user found. Please log in again.</p>
              )}
          </div>
      </div>


      <hr />
<Subscription/>
    </div>
  );
}

export default MyProfile;
