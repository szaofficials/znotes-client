// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';

// const PdfViewer = ({ pdfUrl }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const goToPreviousPage = () => {
//     if (pageNumber > 1) {
//       setPageNumber(pageNumber - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (pageNumber < numPages) {
//       setPageNumber(pageNumber + 1);
//     }
//   };

//   return (
//     <div>
//       <Document
//         file={pdfUrl}
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <div>
//         <button onClick={goToPreviousPage}>Previous</button>
//         <span>Page {pageNumber} of {numPages}</span>
//         <button onClick={goToNextPage}>Next</button>
//       </div>
//     </div>
//   );
// };

// export {PdfViewer};

import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../api/auth";
import "./PDFViewer.css";

const PdfViewer = () => {
  const { pdfFileName } = useParams();
  const { API } = useAuth();

  return (
    <div className="pdfViewerContainer">
      <iframe
        src={`https://storage.googleapis.com/znotes-uploads/${pdfFileName}`}
        title="PDF Viewer"
      ></iframe>
    </div>
  );
};

export {PdfViewer};








// *-------------------------------
// * PDF Viwer through signed url
// * ------------------------------

// import { Link } from "react-router-dom";

// import { useEffect, useState } from "react";

// const PdfViewer = () => {
//   const { pdfFileName } = useParams();
//   const { API } = useAuth();
//   const [pdfUrl, setPdfUrl] = useState("");

//   useEffect(() => {
//     async function fetchPdf(filename) {
//       try {

//         const response = await fetch(`${API}/api/pdf/${filename}`);

//         if (!response.ok) {
//           throw new Error("Failed to fetch PDF");
//         }
//         const { url } = await response.json();

//         // Open the PDF in a new tab or embed it in the page
//         // window.open(url);

//         setPdfUrl(url);
//       } catch (error) {
//         console.error("Error fetching PDF:", error);
//       }
//     }

//     // Example usage
//     fetchPdf("back n.pdf");
//   }, [API]);

//   return (
//     <div style={{ backgroundColor: "#f8f9fa" }}>
//    <div className="pdfViewerContainer">
//         {pdfUrl ? (
//           <iframe
//             src={pdfUrl}
//             title="PDF Viewer"
           
//           ></iframe>
//         ) : (
//           <p>Loading PDF...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export { PdfViewer };
