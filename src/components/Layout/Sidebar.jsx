import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";
import "./Sidebar.css"; // Import sidebar styles
import AdminOnly from "../AdminOnly";
import { useAuth } from "../../api/auth";

const Sidebar = ({
  userData,
  subjects,
  handleAddSubjectClick,
  isOpen,
  onClose,
  isLoading,
}) => {

  const { user } = useAuth();
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">Z-Notes.in</div>
        <div className="sidebar-close" onClick={onClose}>
          &times;
        </div>
      </div>
      <ul className="sidebar-nav-list">
        <li className="sidebar-nav-item">
          <Link
            to={`/Home/${userData?.department}/${userData?.scheme}/${userData?.semester}`}
            className="sidebar-nav-link"
            onClick={onClose}
          >
            <FaHome style={{ fontSize: "22px" }} />
            <span>Home</span>
          </Link>
        </li>

        {isLoading ? ( // Check if subjects are still loading
          <li className="nav-item">Loading...</li>
        ) : subjects.length === 0 ? ( // Check if subjects array is empty
          <li className="nav-item">No subjects available</li>
        ) : (
          subjects.map((subject, index) => (
            <li className="sidebar-nav-item" key={index}>
              <NavLink
                to={`/Home/${userData?.department}/${userData?.scheme}/${userData?.semester}/${subject.subCode}`}
                className="sidebar-nav-link"
                onClick={onClose} // Close sidebar on navigation
              >
                {subject.subAbb}
              </NavLink>
            </li>
          ))
        )}
      </ul>
      <div className="sidebar-footer">
        <AdminOnly isAdmin={user.isApproved}>
          <NavLink to={"/Admin/StudentsList"}
               >All Students</NavLink>
        </AdminOnly>
        <AdminOnly isAdmin={user.isAdmin}>
          <button onClick={handleAddSubjectClick}>
            <FaPlus style={{ marginRight: "5px" }} /> {""} Add Subject
          </button>
        </AdminOnly>
      </div>
    </div>
  );
};

export default Sidebar;
