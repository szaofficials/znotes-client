import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
// import { Route, Switch } from 'react-router-dom';
import { Navbar } from "../../components/Layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/auth";
// import Preloader from "../../components/Preloader/Preloader";
import Spinner from "../../components/Spinner";

const AdminDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedScheme, setSelectedScheme] = useState("");
  const [departments, setDepartments] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [optionsSelected, setOptionsSelected] = useState(false);
  const navigate = useNavigate();

  const { API} = useAuth();


  useEffect(() => {
    // Fetch departments, schemes, and semesters data
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/api/dss`);
        const data = await response.json();
        setDepartments(data.dssData.departments);
        setSchemes(data.dssData.schemes);
        setSemesters(data.dssData.semesters);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API]);

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleSchemeChange = (e) => {
    setSelectedScheme(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };
  useEffect(() => {
    if (selectedDepartment && selectedScheme && selectedSemester) {
      setOptionsSelected(true);
    } else {
      setOptionsSelected(false);
    }
  }, [selectedDepartment, selectedScheme, selectedSemester]);

  useEffect(() => {
    if (optionsSelected) {
      navigate(
        `/Admin/${selectedDepartment}/${selectedScheme}/${selectedSemester}`
      );
    }
  }, [
    optionsSelected,
    navigate,
    selectedDepartment,
    selectedScheme,
    selectedSemester,
  ]);

  return (
    <div className="admin-dashboard">
      <div className="main-content">
        <Navbar />
        {/* Dashboard Overview Section */}
        <section className="dashboard-section">
          <h2>Dashboard </h2>
        </section>

        <div className="dssform">
          <h3>Select Scheme, Dept & Sem : </h3>
          {isLoading ? (
                <Spinner/>
              ) : (<>
          <div className="dss-select">
            <label htmlFor="schemeSelect">Select Scheme:</label>
            <select
              id="schemeSelect"
              required="required"
              value={selectedScheme}
              onChange={handleSchemeChange}
            >
              <option value=""></option>
              {schemes.map((scheme, index) => (
                <option key={index} value={scheme.scheme}>
                  {scheme.scheme}
                </option>
              ))}
            </select>
            <span>Scheme</span>
          </div>

          <div className="dss-select">
            <label htmlFor="departmentSelect">Select Department:</label>
            <select
              id="departmentSelect"
              required="required"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value=""></option>
              {departments.map((department, index) => (
                <option key={index} value={department.deptId}>
                  {department.deptId}
                </option>
              ))}
            </select>
            <span>Department</span>
          </div>
          <div className="dss-select">
            <label htmlFor="semesterSelect">Select Semester:</label>
            <select
              id="semesterSelect"
              required="required"
              value={selectedSemester}
              onChange={handleSemesterChange}
            >
              <option value=""></option>
              {semesters.map((semester, index) => (
                <option key={index} value={semester.semName}>
                  {semester.semName}
                </option>
              ))}
            </select>
            <span>Semester</span>
          </div></>)}
        </div>

        {/* Users Management Section */}
        <section className="users-section">
          <h2>Users Management</h2>
        </section>

        {/* Add Subject Section */}
        <section className="add-subject-section">
          <h2>Add Subject</h2>
          {/* <AddSubjectPopup /> */}
        </section>

        {/* PDF Viewer Section */}
        <section className="pdf-section">
          <h2>Manage PDFs</h2>
        </section>

        {/* Profile Management Section */}
        <section className="profile-section">
          <h2>Manage Profile</h2>
          {/* <UserProfile /> */}
        </section>

        {/* Notes Management Section */}
        <section className="notes-section">
          <h2>Manage Notes</h2>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
