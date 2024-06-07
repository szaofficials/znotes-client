import React from "react";
import { useAuth } from "../../api/auth";
import "./profile.css";
import Avatar from "../../components/Avatar";
import Preloader from "../../components/Preloader/Preloader";

const UserProfile = () => {
  const { user, isFetching } = useAuth();

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <div className="main-container">
      <div className="profile-container">
        <div className="avatar">
          <Avatar userId={user._id} size="80px" borderRadius="50%">
            {user.name ? user.name.charAt(0).toUpperCase() : ""}
          </Avatar>
        </div>

        <div className="profile-heading">
          <h2 style={{ color: "black", margin:"0" }}>{user.name}</h2>
        <p>Role: {user.isAdmin ? "Admin" : "Student"}</p>
        </div>
        <div className="profile-details">
        <table className="profile-table">
            <tbody>
              <tr>
                <td><strong>USN:</strong></td>
                <td>{user.usn}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td><strong>Mobile No.:</strong></td>
                <td>{user.contact}</td>
              </tr>
               <tr>
                <td><strong>Gender:</strong></td>
                <td>{user.gender}</td>
              </tr>
              <tr>
                <td><strong>DOB:</strong></td>
                <td>{new Date(user.dob).toLocaleDateString("en-GB")}</td>
              </tr>
              <tr>
                <td><strong>Department:</strong></td>
                <td>{user.department.deptId}</td>
              </tr>
              <tr>
                <td><strong>Batch:</strong></td>
                <td>{user.batch.batch}</td>
              </tr>
              <tr>
                <td><strong>Semester:</strong></td>
                <td>{user.semester.semName}</td>
              </tr>
              <tr>
                <td><strong>Scheme:</strong></td>
                <td>{user.scheme.scheme}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
