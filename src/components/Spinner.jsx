import React from "react";

const Spinner = () => {
  const spinnerContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: " relative",
    padding: "0px",
  };

  const spinnerStyle = {
    width: "14px",
    height: " 14px",
    borderRadius: "50%",
    border: "3px solid white",
    borderTopColor: "#343638",
    animation: "spin 1s ease-in-out infinite",
    margin: "0px",
  };

  return (
    <div className="spinner-container" style={spinnerContainerStyle}>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div className="spinner" style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
