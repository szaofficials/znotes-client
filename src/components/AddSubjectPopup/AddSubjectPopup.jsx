import React, { useState, useEffect } from "react";
import "./AddSubjectPopup.css";
import { useAuth } from "../../api/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

const AddSubjectPopup = ({
  onAddSubject,
  onClose,
  onAddSubjectSuccess,
  subjectDetails,
  isEditing,
}) => {
  const navigate = useNavigate();
  const { API, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    subCode: "",
    subAbb: "",
    subName: "",
    department: "",
    semester: "",
    scheme: "",
    addedBy: user._id,
    addedByName: user.name,
  });

  useEffect(() => {
    if (isEditing && subjectDetails) {
      setFormData({
        subCode: subjectDetails.subCode,
        subAbb: subjectDetails.subAbb,
        subName: subjectDetails.subName,
        department: subjectDetails.department.deptId,
        semester: subjectDetails.semester.semName,
        scheme: subjectDetails.scheme.scheme,
      });
    }
  }, [isEditing, subjectDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //setFormData({ ...formData, [name]: value });
    let updatedValue = value;
    if (name === "subCode" || name === "subAbb") {
      updatedValue = value.toUpperCase();
    }
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const response = await fetch(`${API}/api/addSub`, {
      //   method: 'POST',
      const url = isEditing
        ? `${API}/api/editSubject/${subjectDetails.subCode}`
        : `${API}/api/addSub`;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();

      if (response.ok) {
        // toast.success("ha add hogaya");

        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Subject "${res_data.subject.subName}" ${
            isEditing ? "updated" : "added"
          } successfully`,
        });

        if (isEditing) {
          // Subject deleted successfully, construct the new URL
          const urlParts = window.location.pathname.split("/"); // Split the current URL by '/'
          urlParts.pop(); // Remove the last segment (subject code) from the URL
          const newURL = urlParts.join("/"); // Reconstruct the URL without the subject code
          // toast.success("Subject Updated successfully");
          navigate(newURL);
        }
        onAddSubjectSuccess();
        onClose();
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "adding"} subject:`,
        error
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Add New Subject</h3>
        <form onSubmit={handleSubmit}>
          <div
            className="inputbox"
            style={{ width: "100%", margin: "0", padding: "0" }}
          >
            <input
              style={{ margin: "0" }}
              name="subCode"
              type="text"
              value={formData.subCode}
              onChange={handleInputChange}
              required
            />
            <span>Subject code</span>
          </div>
          <div
            className="inputbox"
            style={{ width: "100%", margin: "0", padding: "0" }}
          >
            <input
              style={{ margin: "0" }}
              name="subAbb"
              type="text"
              value={formData.subAbb}
              onChange={handleInputChange}
              required
            />
            <span>Subject Abbrivation</span>
          </div>
          <div
            className="inputbox"
            style={{ width: "100%", margin: "0", padding: "0" }}
          >
            <input
              style={{ margin: "0" }}
              name="subName"
              type="text"
              value={formData.subName}
              onChange={handleInputChange}
              required
            />
            <span>Subject Name</span>
          </div>
          <div
            className="inputbox"
            style={{ width: "100%", margin: "0", padding: "0" }}
          >
            <select
              style={{ margin: "0" }}
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required="required"
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
          <div
            className="inputbox"
            style={{ width: "100%", margin: "0", padding: "0" }}
          >
            <select
              style={{ margin: "0" }}
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              required="required"
            >
              <option value=""></option>
              <option value="1st Sem">1st Sem</option>
              <option value="2nd Sem">2nd Sem</option>
              <option value="3rd Sem">3rd Sem</option>
              <option value="4th Sem">4th Sem</option>
              <option value="5th Sem">5th Sem</option>
              <option value="6th Sem">6th Sem</option>
              <option value="7th Sem">7th Sem</option>
              <option value="8th Sem">8th Sem</option>
            </select>
            <span>Select Semester</span>
          </div>
          <div
            className="inputbox"
            style={{ width: "100%", margin: "0", padding: "0" }}
          >
            <select
              style={{ margin: "0" }}
              name="scheme"
              value={formData.scheme}
              onChange={handleInputChange}
              required="required"
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
          {/* <button type="submit">Add Subject</button> */}
          <button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> :
            (isEditing ? "Update Subject" : "Add Subject")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubjectPopup;
