import React, { useState } from "react";
import { useAuth } from "../../api/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaUpload, FaPaperclip } from "react-icons/fa";
import "./AddPdfPopup.css";
import Spinner from "../Spinner";

const AddPdfPopup = ({ onClose, subjectDetails, onAddPdf, sectionId }) => {
  const { API, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [pdfFormData, setPdfFormData] = useState({
    pdfTitle: "",
    pdfDescription: "",
    pdfFile: null,
  });
  const [pdfFileName, setPdfFileName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPdfFormData({
      ...pdfFormData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFormData({
      ...pdfFormData,
      pdfFile: file,
    });
    setPdfFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Check if a PDF file is selected
    if (!pdfFormData.pdfFile) {
      toast.error("Please select a PDF file");
      setIsLoading(false);
      return; // Prevent further operation
    }

    const formData = new FormData();
    formData.append("pdfTitle", pdfFormData.pdfTitle);
    formData.append("pdfDescription", pdfFormData.pdfDescription);
    formData.append("pdfFile", pdfFormData.pdfFile);
    formData.append("subCode", subjectDetails.subCode);
    formData.append("addedBy", user._id);
    formData.append("addedByName", user.name);
    formData.append("deptId", subjectDetails.department.deptId);
    formData.append("schemeId", subjectDetails.scheme.schemeId);
    formData.append("semNum", subjectDetails.semester.semNum);
    try {
      const response = await fetch(
        `${API}/api/addPdfToSection/${sectionId}/addPdf`,
        {
          method: "POST",
          body: formData,
        }
      );

      const newPdf = await response.json();

      if (response.ok) {
        let successMessage = "PDF added successfully";
        if (newPdf.pdf.pdfTitle) {
          successMessage = `PDF "${newPdf.pdf.pdfTitle}" added successfully`;
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: successMessage,
        });

        toast.success(successMessage);
        onAddPdf(newPdf.pdf);

        // onAddPdf();

        onClose();
      } else {
        toast.error(newPdf.message);
      }
    } catch (error) {
      console.error("Error adding PDF:", error);
      toast.error("Failed to add PDF");
    }
    setIsLoading(false);
  };

  const handleClearInput = () => {
    setPdfFormData({
      ...pdfFormData,
      pdfFile: null,
    });
    setPdfFileName("");
    // Reset file input field
    const fileInput = document.getElementById("pdfFile");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Add New PDF</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="inputbox">
              <input
                type="text"
                name="pdfTitle"
                value={pdfFormData.pdfTitle}
                onChange={handleInputChange}
                // required
              />
              <span>Title</span>
            </div>
            <div className="inputbox">
              <input
                name="pdfDescription"
                value={pdfFormData.pdfDescription}
                onChange={handleInputChange}
                // required
              />
              <span>Description</span>
            </div>
          </div>
          <div className="input-container">
            <div className="choosePdf">
              <label htmlFor="pdfFile" className="upload-label">
                <FaPaperclip />
                Choose a file...
              </label>
              <input
                type="file"
                id="pdfFile"
                name="pdfFile"
                onChange={handleFileChange}
              />
              <p
                style={{
                  marginLeft: "5px",
                  padding: "0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {" "}
                {pdfFileName}
              </p>
              <span className="inputClear" onClick={handleClearInput}>
                &times;
              </span>
            </div>
          </div>

          <div className="addPdfBtn">
            <button type="submit">
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <FaUpload className="upload-icon" /> Upload PDF
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPdfPopup;
