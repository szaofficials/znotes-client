import React, { useState, useEffect } from "react";
import "../AddSubjectPopup/AddSubjectPopup.css";
import { useAuth } from "../../api/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "../Spinner";

const AddSectionPopup = ({ onClose, subjectDetails, onAddSection, sectionToEdit, onUpdateSectionDetails }) => {
  const { API, user } = useAuth();
  const [sectionName, setSectionName] = useState("");
  const [sectionDesc, setSectionDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If sectionToEdit is provided, populate the input fields with its details
    if (sectionToEdit ) {
      setSectionName(sectionToEdit.sectionName);
      setSectionDesc(sectionToEdit.sectionDesc);
    } else {
      // Clear input fields when adding a new section
      setSectionName("");
      setSectionDesc("");
    }
  }, [sectionToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "sectionName") {
      setSectionName(value);
    } else if (name === "sectionDesc") {
      setSectionDesc(value);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);

    try {
      let url = `${API}/api/addSectionsToSubject`;
      let method = "POST";

      // If sectionToEdit is provided, modify the URL and method for editing
      if (sectionToEdit) {
        url = `${API}/api/updateSection/${subjectDetails.subCode}/${sectionToEdit._id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subCode: subjectDetails.subCode,
          sectionName,
          sectionDesc,
           addedBy: user._id, 
           addedByName:user.name,
          ...(sectionToEdit && { sectionIndex: sectionToEdit.sectionIndex }), // Include sectionIndex only for editing
        }),
      });

      const res_data = await response.json();

      console.log("updated section data", res_data.section);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          // text: `"${res_data.section.sectionName}" section ${
          //   sectionToEdit ? "updated" : "added"
          // } successfully`,
          text: `${sectionToEdit ? "Section" : res_data.section.sectionName} ${
            sectionToEdit ? "updated" : "added"
        } successfully`,
        });
        if (sectionToEdit) {
          onUpdateSectionDetails(res_data.section);
        } else {
          onAddSection(res_data.section);
        }
         
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res_data.extraDetails ? res_data.extraDetails : res_data.message,
        });
      }
    } catch (error) {
      console.error("Error adding/updating section:", error);
      toast.error("Failed to add/update section");
    }
    setIsLoading(false);
  };


  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Add New Section</h3>
     
        <form onSubmit={handleSubmit}>
          <div className="inputbox" style={{width:'100%', margin:'0', padding:'0'}}>
            <input
              style={{margin:'0'}}
              name="sectionName"
              type="text"
              value={sectionName}
              onChange={handleInputChange}
              required
            />
            <span>Section Name</span>
          </div>
          <div className="inputbox" style={{width:'100%', margin:'0', padding:'0'}}>
            <textarea
              style={{margin:'0'}}
              name="sectionDesc"
              type="text"
              value={sectionDesc}
              onChange={handleInputChange}
            
            />
            <span>Section Description</span>
          </div>
          {/* <button type="submit">Add Section</button> */}
          
          <button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : (sectionToEdit ? 'Update Section' : 'Add Section')}
            </button>
        </form>
      </div>
    </div>
  );
};

export default AddSectionPopup;
