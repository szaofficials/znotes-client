import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";
import "./Sidebar.css"; // Import sidebar styles

const Sidebar = ({ userData, subjects, handleAddSubjectClick, isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">Z-Notes</div>
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
            <FaHome style={{fontSize : '22px'}} />
            <span>Home</span>
          </Link>
        </li>
        {subjects.map((subject, index) => (
          <li className="sidebar-nav-item" key={index}>
            <NavLink
              to={`/Home/${userData?.department}/${userData?.scheme}/${userData?.semester}/${subject.subCode}`}
              className="sidebar-nav-link"
              onClick={onClose} // Close sidebar on navigation
            >
              {subject.subAbb}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button onClick={handleAddSubjectClick}>
          <FaPlus style={{marginRight:'5px'}}/> {""} Add Subject
        </button>
      </div>
    </div>
  );
};

export default Sidebar;