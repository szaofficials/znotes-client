import React from "react";
import { useAuth } from "../../api/auth";
import "./profile.css";
import Avatar from "../../components/Avatar";
import Preloader from "../../components/Preloader/Preloader";

const UserProfile = () => {
  const { user,isFetching } = useAuth();

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <div className="main-container">
      <div className="profile-container">
        <div className="avatar">
          <Avatar
           width="10px"
            px="12px"
            py="8px"
            borderRadius="50%"
            color="white"
          >
            {user.name ? user.name.charAt(0).toUpperCase() : ""}
          </Avatar>
        </div>

        <div className="profile-heading">
          <h2 style={{ color:"black"}}>{user.name}</h2>
        </div>
        <div className="profile-details">
          <div className="profile-col-1">
          <p>
              <strong>USN:</strong> {user.usn}
            </p>
            <p>
              <strong>Email:</strong>{" "} {user.email}
            </p>
            <p>
              <strong>Mobile No.:</strong> {user.contact}
            </p>
           
            <p>
              <strong>Department:</strong> {user.department.deptId}
            </p>
          </div>
          <div className="profile-col-2">
           <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong> {" "} 
              {new Date(user.dob).toLocaleDateString('en-GB')}
             
            </p> 
           
            <p>
              <strong>Semester:</strong> {user.semester.semName}
            </p>
            <p>
              <strong>Scheme:</strong> {user.scheme.scheme}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
