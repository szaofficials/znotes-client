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


import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from "../../api/auth";
import './PDFViewer.css';

const PdfViewer = () => {
  const { pdfFileName } = useParams();
  const { API } = useAuth();

  return (
    <div className="pdfViewerContainer">
      <iframe
        src={`${API}/uploads/${pdfFileName}`}
        title="PDF Viewer"
      ></iframe>
    </div>
  );
};

export {PdfViewer};
