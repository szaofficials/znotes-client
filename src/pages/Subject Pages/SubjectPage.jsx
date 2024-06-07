import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../api/auth";
import { toast } from "react-toastify";
import Preloader from "../../components/Preloader/Preloader";
import "./SubjectPage.css";
import Layout from "../../components/Layout/Layout";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddSectionPopup from "../../components/AddSectionPopup/AddSectionPopup";
import AddPdfPopup from "../../components/AddPdfPopup/AddPdfPopup";
import AdminOnly from "../../components/AdminOnly";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AddSubjectPopup from "../../components/AddSubjectPopup/AddSubjectPopup";

const SubjectPage = () => {
  const { subCode } = useParams();
  const { API, user } = useAuth();
  const navigate = useNavigate();
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddSectionPopup, setShowAddSectionPopup] = useState(false);
  const [showAddPdfPopup, setShowAddPdfPopup] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [showEditSubjectPopup, setShowEditSubjectPopup] = useState(false);
  const [sectionId, setSectionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSections, setFilteredSections] = useState([]);



  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    const fetchSubjectDetails = async () => {
      try {
        const response = await fetch(`${API}/api/getSubjectDetails/${subCode}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          // Check if the component is still mounted
          setSubjectDetails(data);
          //   toast.success("Subject details fetched successfully!");
          // console.log("Subject details aggregate", subjectDetails);
        }
      } catch (error) {
        console.error("Error fetching subject details:", error);
        toast.error("Failed to fetch subject details");
      } finally {
        if (isMounted) {
          // Check if the component is still mounted
          setIsLoading(false);
        }
      }
    };

    fetchSubjectDetails();

    return () => {
      isMounted = false; // Clean up function to update the flag
    };
  }, [subCode, API]);


  useEffect(() => {
    // Filter sections based on searchQuery
    if (subjectDetails) {
      const filtered = subjectDetails.sections.filter(section =>
        section.sectionName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSections(filtered);
    }
  }, [searchQuery, subjectDetails]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleEditSubjectClick = () => {
    setShowEditSubjectPopup(true);
  };
  const handleAddSectionClick = () => {
    setShowAddSectionPopup(true);
    setEditingSection(null); // Clear the editingSection state when adding a new section
  };

  const handleAddSection = (newSection) => {
    setSubjectDetails((prevDetails) => ({
      ...prevDetails,
      sections: [...prevDetails.sections, newSection],
    }));
  };

  const handleCloseAddSectionPopup = () => {
    setShowAddSectionPopup(false); // Close AddSectionPopup
  };

  const handleEditSectionClick = (section) => {
    setEditingSection(section); // Set the section to edit
    setShowAddSectionPopup(true);
  };

  const onUpdateSectionDetails = (updatedSection) => {
    setSubjectDetails((prevDetails) => {
      const updatedSections = prevDetails.sections.map((section) => {
        if (section._id === updatedSection._id) {
          return updatedSection;
        } else {
          return section;
        }
      });
      return { ...prevDetails, sections: updatedSections };
    });
  };
  const handleAddPdfClick = (sectionId) => {
    setShowAddPdfPopup(true);
    setSectionId(sectionId);
  };

  const handleCloseAddPdfPopup = () => {
    setShowAddPdfPopup(false);
    setSectionId(null);
  };

  // const handleAddPdf = (newPdf) => {
  //   setSubjectDetails((prevDetails) => {
  //     const updatedSections = [...prevDetails.sections];
  //     updatedSections[sectionId].pdfs.push(newPdf);
  //     return { ...prevDetails, sections: updatedSections };
  //   });
  // };

  // const handleAddPdf = (newPdf, sectionId) => {
  //   setSubjectDetails((prevDetails) => {
  //     const updatedSections = prevDetails.sections.map((section) => {
  //       if (section._id === sectionId) {
  //         return {
  //           ...section,
  //           pdfs: [...section.pdfs, newPdf],
  //         };
  //       }
  //       return section;
  //     });
  //     return { ...prevDetails, sections: updatedSections };
  //   });
  // };

  const handleAddPdf = (newPdf) => {
    window.location.reload();
  };

  const handleDeletePdf = async (pdfId, sectionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this PDF!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API}/api/deletePdfFromSection`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pdfId, sectionId }),
          });
          if (!response.ok) {
            throw new Error("Failed to delete PDF");
          }
          const data = await response.json();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: data.message,
          });
          // Update the UI to reflect the deletion (remove the PDF from the state)
          setSubjectDetails((prevDetails) => ({
            ...prevDetails,
            sections: prevDetails.sections.map((section) => {
              if (section._id === sectionId) {
                return {
                  ...section,
                  pdfs: section.pdfs.filter((pdf) => pdf._id !== pdfId),
                };
              }
              return section;
            }),
          }));
          toast.success(data.message);
        } catch (error) {
          console.error("Error deleting PDF:", error);
          toast.error("Failed to delete PDF");
        }
      }
    });
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!subjectDetails) {
    return (
      <div>No details available for this subject. Please Contact the Admin</div>
    );
  }

  const handleDeleteSection = (sectionIndex) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this section!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${API}/api/deleteSection/${subCode}/${sectionIndex}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ sectionIndex }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete section");
          }
          // Section deleted successfully, update the UI accordingly (remove the section from the state)
          setSubjectDetails((prevDetails) => ({
            ...prevDetails,
            sections: prevDetails.sections.filter(
              (_, index) => index !== sectionIndex
            ),
          }));
          toast.success("Section deleted successfully");
        } catch (error) {
          console.error("Error deleting section:", error);
          toast.error("Failed to delete section");
        }
      }
    });
  };

  const handleDeleteSubject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this subject!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${API}/api/deleteSubject/${subCode}`, // Use the correct API endpoint for deleting the subject
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ subCode }), // Send the subject code to identify which subject to delete
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete subject");
          }
          // Subject deleted successfully, construct the new URL
          const urlParts = window.location.pathname.split("/"); // Split the current URL by '/'
          urlParts.pop(); // Remove the last segment (subject code) from the URL
          const newURL = urlParts.join("/"); // Reconstruct the URL without the subject code
          toast.success("Subject deleted successfully");
          navigate(newURL); // Navigate to the new URL
        } catch (error) {
          console.error("Error deleting subject:", error);
          toast.error("Failed to delete subject");
        }
      }
    });
  };

  return (
    <Layout>
      <div>
        <div className="SubjectPage">
          <div className="search-container">
            <input type="text" id="searchInput" placeholder="What do you want ?" value={searchQuery} onChange={handleSearchInputChange}  />
          </div>
          <div className="subjectContainer">
            <p>{subjectDetails.description}</p>
            <div className="subject-title">
              {subjectDetails.subAbb} - {subjectDetails.subName} (
              {subjectDetails.subCode})
              <AdminOnly isAdmin={user.isAdmin}>
                <div className="edOptions">
                  <FaEdit
                    className="fa-edit"
                    onClick={handleEditSubjectClick}
                  />{" "}
                  Subject Details Or{" "}
                  <FaTrash
                    className="fa-trash"
                    onClick={() => handleDeleteSubject()}
                  />{" "}
                  This Subject
                </div>
              </AdminOnly>
            </div>

            {/*  Sample Dummy items
            
            <section className="subSection">
              <div className="sectionTitle">
                <h3>Assignments</h3>
              </div>
              <div className="pdf-container">
                <div className="pdf-item">
                  <div className="pdfTitle">
                    <h3>PDF Title</h3>
                  </div>
                  <div className="pdf-item-desc">
                    <p>pdf description</p>
                  </div>
                </div>

                <div className="add-section" onClick={handleAddPdfClick}>
                  <span className="plus-icon">
                    <FaPlus />
                  </span>
                  <span className="add-section-text">Add PDF</span>
                </div>
              </div>
              <div className="add-section" onClick={handleAddSectionClick}>
                <span className="plus-icon">
                  <FaPlus />
                </span>
                <span className="add-section-text">Add Section</span>
              </div>
            </section> */}

            {subjectDetails.sections && subjectDetails.sections.length > 0 ? (
              filteredSections.map((section, sectionIndex) => (
                <section key={section._id} className="subSection">
                  <div className="section">
                    <div className="sectionTitle">
                      <h3>{section.sectionName}</h3>
                      <AdminOnly isAdmin={user.isAdmin}>
                        <div className="edOptions">
                          <FaEdit
                            className="fa-edit"
                            onClick={() => handleEditSectionClick(section)}
                          />{" "}
                          Or{" "}
                          <FaTrash
                            className="fa-trash"
                            onClick={() => handleDeleteSection(sectionIndex)}
                          />{" "}
                          This Section
                        </div>
                      </AdminOnly>
                    </div>
                    <div className="sectionDesc">
                      <p style={{ margin: "0 0 8px 0" }}>{section.sectionDesc}</p>
                    </div>
                    <div className="pdf-container">
                      {/* Render PDFs if available for the section */}
                      {section.pdfs && section.pdfs.length > 0 ? (
                        section.pdfs.map((pdf, pdfIndex) => (
                          <div key={pdf._id} className="pdf-item">
                            {/* Render PDF title and description */}
                            <div className="pdfTitle">
                            {pdf.pdfTitle && <h3>{pdf.pdfTitle}</h3>}
                              <AdminOnly isAdmin={user.isAdmin}>
                                <div className="edOptions">
                                  <FaTrash
                                    className="fa-trash"
                                    onClick={() =>
                                      handleDeletePdf(pdf._id, section._id)
                                    }
                                  />
                                </div>
                              </AdminOnly>
                            </div>

                            <div className="pdf-viewer">
                              <iframe
                                src={`${API}/uploads/${pdf.pdfFile}`}
                                title={pdf.pdfTitle}
                              ></iframe>
                            </div>
                            <div className="pdf-item-desc">
                              <p style={{ margin: "5px" }}>
                                {pdf.pdfDescription}{" "}
                              </p>
                              <p style={{ margin: "8px 0" }}>
                                {" "}
                                <strong> Uploaded on:</strong>{" "}
                                {new Date(pdf.addedAt).toLocaleString(
                                  undefined,
                                  {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                navigate(`/pdfViewer/${pdf.pdfFile}`)
                              }
                            >
                              View
                            </button>
                          </div>
                        ))
                      ) : (
                        <div
                          className="pdf-item"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                          }}
                        >
                          No {section.sectionName} available yet.
                        </div>
                      )}
                      <AdminOnly isAdmin={user.isAdmin}>
                        <div className="add-section">
                          <span className="plus-icon">
                            <FaPlus
                              onClick={() => handleAddPdfClick(section._id)}
                            />
                          </span>
                          <span className="add-section-text">Add PDF</span>
                        </div>
                      </AdminOnly>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <div
                className="subSection"
                style={{
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                No Study Material is available for {subjectDetails.subAbb}.
              </div>
            )}

            <AdminOnly isAdmin={user.isAdmin}>
              <div className="add-section" onClick={handleAddSectionClick}>
                <span className="plus-icon">
                  <FaPlus />
                </span>
                <span className="add-section-text">Add Section</span>
              </div>
            </AdminOnly>
          </div>
        </div>
      </div>
      {showAddSectionPopup && (
        <AddSectionPopup
          onClose={handleCloseAddSectionPopup}
          subjectDetails={subjectDetails} // Pass subject details as props
          onAddSection={handleAddSection}
          sectionToEdit={editingSection}
          onUpdateSectionDetails={onUpdateSectionDetails}
        />
      )}
      {showAddPdfPopup && (
        <AddPdfPopup
          onClose={handleCloseAddPdfPopup}
          subjectDetails={subjectDetails}
          sectionId={sectionId}
          onAddPdf={handleAddPdf}
        />
      )}
      {showEditSubjectPopup && (
        <AddSubjectPopup
          onClose={() => setShowEditSubjectPopup(false)}
          subjectDetails={subjectDetails}
          isEditing={true}
          onAddSubjectSuccess={() => {
            setShowEditSubjectPopup(false);
          }}
        />
      )}
    </Layout>
  );
};

export { SubjectPage };
