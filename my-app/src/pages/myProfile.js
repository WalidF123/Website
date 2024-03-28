import { FaUser } from "react-icons/fa";
import { getUser, getUsers } from "../data/repository";

import React, { useState } from "react";
import { removeUser, updateUser } from "../data/repository";


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
    const updatedData = { ...currentUser, name: formData.name }; 
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
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px"}}>
        <div style={{ width: "70px", height: "70px", backgroundColor: "#ccc", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FaUser size={50} />
        </div>
        <div style={{ marginLeft: "20px" }}>
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
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <h2>{currentUser.name}</h2>
                  <p>Email: {currentUser.email}</p>
                  <p>Date of Joining: {currentUser.dateOfJoining}</p>
                  <button onClick={() => setEditMode(true)}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </>
              )}
            </>
          ) : (
            <p>No user found. Please log in again.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
