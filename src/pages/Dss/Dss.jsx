import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dss.css";
import LoginModal from "../../components/LoginModel";
import { useDeviceSize } from "../../Context/DeviceSizeContext";
import { useAuth } from "../../api/auth";
import Spinner from "../../components/Spinner";

const Dss = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedScheme, setSelectedScheme] = useState("");
  const [departments, setDepartments] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [optionsSelected, setOptionsSelected] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { API, isLoggedIn } = useAuth();
  const { isMobile } = useDeviceSize();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch departments, schemes, and semesters data
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/api/cdss`);
        const data = await response.json();
        setDepartments(data.dssData.department);
        setSchemes(data.dssData.scheme);
        setSemesters(data.dssData.semester);
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

  const toggleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  useEffect(() => {
    if (selectedDepartment && selectedScheme && selectedSemester) {
      setOptionsSelected(true);
    } else {
      setOptionsSelected(false);
    }
  }, [selectedDepartment, selectedScheme, selectedSemester]);

  useEffect(() => {
    if (optionsSelected && !isLoggingIn) {
      navigate(
        `/Home/${selectedDepartment}/${selectedScheme}/${selectedSemester}`
      );
    }
  }, [
    optionsSelected,
    isLoggingIn,
    navigate,
    selectedDepartment,
    selectedScheme,
    selectedSemester,
  ]);

  const handleLogin = () => {
    setIsLoggingIn(true);
    setShowLoginModal(false);
  };

  if (isLoggedIn) {
    return navigate("/Welcome");
  }

  return (
    <div className="dsscontainer">
      {isMobile ? (
        <h1 className="dss-h1">
          Welcome to
          <br /> <span style={{ fontSize: "1.1em" }}> Z-Notes.in</span>
        </h1>
      ) : (
        <h1 className="dss-h1">Welcome to Z-Notes.in</h1>
      )}
      <div className="middle-container">
        <div className="middle-container-q">
          <p style={{ margin: "5px" }}>
            "Engineering is not being hard worker
            <br /> Engineering is the art of Smart Work!"
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "right" }}
          >
            - Syed Zeeshan Patel
          </div>
        </div>
        <div className="middle-container-f">
          {isLoggingIn ? (
            <div>
              <h2 className="dss-h2">Login</h2>
              <button onClick={toggleLogin}>Back</button>
            </div>
          ) : (
            <div className="dssform">
              <h3>Select Scheme, Dept & Sem : </h3>
              {isLoading ? (
                <Spinner />
              ) : (<><div style={{height:'80px'}}></div></>
                // <>
                //   <div className="dss-select">
                //     <label htmlFor="schemeSelect">Select Scheme:</label>
                //     <select
                //       id="schemeSelect"
                //       required="required"
                //       value={selectedScheme}
                //       onChange={handleSchemeChange}
                //     >
                //       <option value=""></option>
                //       {schemes.map((scheme, index) => (
                //         <option key={index} value={scheme.scheme}>
                //           {scheme.scheme}
                //         </option>
                //       ))}
                //     </select>
                //     <span>Scheme</span>
                //   </div>

                //   <div className="dss-select">
                //     <label htmlFor="departmentSelect">Select Department:</label>
                //     <select
                //       id="departmentSelect"
                //       required="required"
                //       value={selectedDepartment}
                //       onChange={handleDepartmentChange}
                //     >
                //       <option value=""></option>
                //       {departments.map((department, index) => (
                //         <option key={index} value={department.deptId}>
                //           {department.deptId}
                //         </option>
                //       ))}
                //     </select>
                //     <span>Department</span>
                //   </div>
                //   <div className="dss-select">
                //     <label htmlFor="semesterSelect">Select Semester:</label>
                //     <select
                //       id="semesterSelect"
                //       required="required"
                //       value={selectedSemester}
                //       onChange={handleSemesterChange}
                //     >
                //       <option value=""></option>
                //       {semesters.map((semester, index) => (
                //         <option key={index} value={semester.semName}>
                //           {semester.semName}
                //         </option>
                //       ))}
                //     </select>
                //     <span>Semester</span>
                //   </div>
                // </>
              )}
              <div className="or-divider">Or</div>
              <div className="btn-container">
                <button className="btn-primary" onClick={toggleLogin}>
                  Login to continue
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="middle-container-q">
          {" "}
          And you are here! <br />
          Which means you are a Smart Guy{" "}
        </div>
      </div>
      {showLoginModal && (
        <LoginModal onClose={handleCloseModal} onLogin={handleLogin} />
      )}
    </div>
  );
};

export { Dss };
