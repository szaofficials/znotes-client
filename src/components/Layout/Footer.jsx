// Footer.jsx
import React from 'react';

const Footer = () => {
    return (
      <footer style={footerStyle}>
        <p style={{margin:'0'}}>&copy; {new Date().getFullYear()} <b>Z - Notes </b> All rights reserved.</p>
      </footer>
    );
};

const footerStyle = {
  backgroundColor: '#333' ,
  color: '#fff',
  padding: '15px',
  textAlign: 'center',
};

export {Footer};