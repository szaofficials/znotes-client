import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { toast } from "react-toastify";
import { useAuth } from "../api/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const SignUp = () => {
  const { API } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    usn: "",
    name: "",
    gender: "",
    email: "",
    password: "",
    contact: "",
    dob: "",
    department: "",
    semester: "",
    scheme: "",
    batch: "",
    // studentExists: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedUsn = name === "usn" ? value.toUpperCase() : value;
    setFormData({ ...formData, [name]: updatedUsn });
  };

  useEffect(() => {
    // Calculate and set the initial value of scheme when batch changes
    if (formData.batch) {
      const calculatedScheme = calculateScheme(formData.batch);
      setFormData((prevData) => ({ ...prevData, scheme: calculatedScheme }));
    }
  }, [formData.batch]);

  const calculateScheme = (batch) => {
    // Define your logic to calculate scheme based on batch here
    switch (batch) {
      case "2021":
        return "2021";
      case "2022":
        return "2022";
      case "2023":
        return "2022";
      case "2024":
        return "2024";
      case "2025":
        return "2025";
      default:
        return ""; 
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate the USN format before proceeding
      const usnRegex = /^[0-9]{1}[A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{3}$/;
      if (!usnRegex.test(formData.usn)) {
        Swal.fire({
          icon: "error",
          title: "Invalid USN",
          text: "Please enter a valid USN in the format '0XX00XX000'",
        });
        setIsLoading(false);
        return;
      }
      const response = await fetch(`${API}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();
      // console.log("Customer added successfully:", response)
      // console.log("Response from server:", res_data.extraDetails);
      // console.log("Response from server:", res_data);

      if (response.ok) {
        // Handle success
        toast.success("Sign Up Successfull !!!");

        Swal.fire({
          icon: "success",
          title: "Sign up Successful",
          text: "Now you may login to access Z-Notes",
        });

        // Clear form data
        setFormData({
          usn: "",
          name: "",
          gender: "",
          email: "",
          password: "",
          contact: "",
          dob: "",
          department: "",
          semester: "",
          scheme: "",
        });

        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      // Handle error
      console.error("Error in sign up:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="signup-model">
      <h2 className="signup-h2">Sign Up</h2>
      {/* <div className="signup-form"> */}
      <div className="form-container">
        <p style={{ margin: "15px", fontSize: "1em", color: "black" }}>
          Fill in your details to get the access to Z-Notes .
        </p>
        <form>
          {/* <div className="signup-grid"> */}
          {/* <div className="signup-input-wrapper"> */}
          <div className="form-group">
            <div className="inputbox">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
              <span>Name </span>
            </div>

            <div className="inputbox">
              <input
                type="text"
                name="usn"
                required
                value={formData.usn}
                onChange={handleInputChange}
                maxLength={10}
              />
              <span>USN </span>
            </div>
          </div>
          <div>
            <div className="form-group">
              <div className="inputbox">
                <input
                  type="text"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleInputChange}
                />
                <span>Contact No.</span>
              </div>

              <div className="inputbox">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <span>Email </span>
              </div>
            </div>

            <div className="form-group">
              <div className="inputbox">
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <span>Gender</span>
              </div>

              <div className="inputbox">
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleInputChange}
                />

                <span
                  style={{
                    backgroundColor: "white",
                    margin: "2px",
                  }}
                >
                  Date of Birth
                </span>
              </div>
            </div>

            <div className="form-group">
              <div className="inputbox">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span>Password </span>
              </div>
              <div className="inputbox">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value=""></option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="Civil">Civil</option>
                  <option value="Mech">Mech</option>
                </select>
                <span>Select Department</span>
              </div>
            </div>
            <div className="form-group">
            <div className="inputbox" style={{width:'33%'}}>
                <select
                  name="batch"
                  value={formData.batch}
                  onChange={handleInputChange}
                  required
                >
                  <option value=""></option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
                <span>Select Batch</span>
              </div>
              <div className="inputbox" style={{width:'33%'}}>
                <select
                  name="scheme"
                  value={formData.scheme}
                  onChange={handleInputChange}
                  required
                >
                  <option value=""></option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
                <span>Select Scheme</span>
              </div>
              <div className="inputbox" style={{width:'33%'}}>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  required
                >
                  <option value=""></option>
                  <option value="1">1st Sem</option>
                  <option value="2">2nd Sem</option>
                  <option value="3">3rd Sem</option>
                  <option value="4">4th Sem</option>
                  <option value="5">5th Sem</option>
                  <option value="6">6th Sem</option>
                  <option value="7">7th Sem</option>
                  <option value="8">8th Sem</option>
                </select>
                <span>Select Semester</span>
              </div>
            </div>
          </div>
          <div className="signup-btn-container" >
            <button
              className="signup-btn-primary"
              style={{marginLeft:'0'}}
              onClick={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { SignUp };
