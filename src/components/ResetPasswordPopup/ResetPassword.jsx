import React from 'react';
// import './Popup.css'; 

const ResetPassword = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
      <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Bhool Gaye ?</h2>
        <p>Rset password functionality is not yet developed<br/> Please ask Admin to do it for you</p>
      </div>
    </div>
  );
};

export default ResetPassword;
