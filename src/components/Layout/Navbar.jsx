import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import "../Layout/Navbar.css"; // Import your CSS file
import { useAuth } from "../../api/auth";
import { FaUser, FaSignOutAlt, FaHome, FaPlus, FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

import Avatar from "../Avatar";
import AddSubjectPopup from "../AddSubjectPopup/AddSubjectPopup";
import { toast } from "react-toastify";
import AdminOnly from "../AdminOnly";
import { useDeviceSize } from "../../Context/DeviceSizeContext";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, API } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const { department, scheme, semester } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useDeviceSize();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user) {
      setUserData({
        department: user.department.deptId,
        semester: user.semester.semName,
        scheme: user.scheme.scheme,
      });
    } else if (department && semester && scheme) {
      setUserData({
        department,
        semester,
        scheme,
      });
    }
  }, [isLoggedIn, user, department, semester, scheme]);

  const fetchSubjects = async () => {
    if (!userData) return;

    // console.log("The criterias are: ", userData);

    setIsLoading(true);
    try {
      const response = await fetch(`${API}/api/getSub`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json({});
      // console.log("Data from the server",data)
      setSubjects(data.subjects);
      // console.log("Data from the server setsubject",subjects)

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, [userData, API]);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate("/logout");
    toast.success("Logout Successful");
  };

  const handleAddSubjectClick = () => {
    setIsPopupOpen(true);
  };

  // const handleAddSubjectSuccess = () => {
  //   fetchSubjects(); // Fetch subjects again after adding a new subject
  // };
  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isMobile && (
        <Sidebar
          userData={userData}
          subjects={subjects}
          handleAddSubjectClick={handleAddSubjectClick}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isLoading={isLoading}
        />
      )}
      <nav className="navbar">
        {isMobile && (
          <div className="navbar-burger" onClick={toggleSidebar}>
            <FaBars />
          </div>
        )}
        {isMobile && (
          <>
            <div className="navbar-title">Z-Notes.in</div>{" "}
            {!isLoggedIn && (
              <div style={{ width: "10px", height: "10px" }}></div>
            )}
          </>
        )}
        {!isMobile && (
          <ul className="navbar-nav">
            <li className="nav-item">
              {userData && (
                <Link
                  to={`/Home/${userData.department}/${userData.scheme}/${userData.semester}`}
                  className="nav-link"
                >
                  <FaHome
                    style={{ verticalAlign: "middle", fontSize: "30px" }}
                  />
                </Link>
              )}
            </li>
            {isLoading ? ( // Check if subjects are still loading
              <li className="nav-item">Loading...</li>
            ) : subjects.length === 0 ? ( // Check if subjects array is empty
              <li className="nav-item">No subjects available</li>
            ) : (
              subjects.map((subject, index) => (
                <li className="nav-item" key={index}>
                  <NavLink
                    to={`/Home/${userData.department}/${userData.scheme}/${userData.semester}/${subject.subCode}`}
                    className="nav-link"
                  >
                    {subject.subAbb}
                  </NavLink>
                  |
                </li>
              ))
            )}

            <AdminOnly isAdmin={user.isOwner}>
              <li className="nav-item">
                <Link to="/Admin/Dashboard" className="nav-link">
                  <MdDashboard className="MdDashboard" />
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <NavLink to={"/Admin/StudentsList"} className="nav-link">
                  <PiStudentBold className="PiStudentBold" />
                  All Students
                </NavLink>
              </li>
            </AdminOnly>
            <AdminOnly isAdmin={user.isAdmin}>
              <li className="nav-item" onClick={() => setIsPopupOpen(true)}>
                <FaPlus
                  style={{
                    verticalAlign: "middle",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              </li>
            </AdminOnly>
          </ul>
        )}
        {isPopupOpen && (
          <AddSubjectPopup
            onClick={handleAddSubjectClick}
            onClose={handlePopupClose}
            onAddSubjectSuccess={fetchSubjects}
          />
        )}

        {isLoggedIn && (
          <div className="avatar-container" onClick={handleAvatarClick}>
            <Avatar userId={user._id} size="35px" borderRadius="50%">
              {user.name ? user.name.charAt(0).toUpperCase() : ""}
            </Avatar>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  onClick={() =>
                    navigate(`/Profile/${user.usn ? user.usn : ""}`)
                  }
                  style={{ borderBottom: " 1px solid #fff" }}
                >
                  <FaUser style={{ verticalAlign: "top" }} />
                  Profile
                </button>

                <button onClick={handleLogout}>
                  Logout <FaSignOutAlt style={{ verticalAlign: "middle" }} />{" "}
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export { Navbar };
