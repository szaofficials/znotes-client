import React, { useEffect, useState } from 'react';
import './Preloader.css'; // Import your CSS file

const Preloader = () => {
  const [typedText, setTypedText] = useState('');
  const textToType = 'Z-Notes...'; // Text to be typed
  const typingSpeed = 200; // Typing speed (adjust as needed)

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTypedText((prevText) => {
        // Reset typed text when the end of the string is reached
        if (index === textToType.length) {
          index = 0;
          return '';
        }

        // Add next character to typed text
        const newText = textToType.substring(0, index + 1);
        index++; // Move to the next character
        return newText;
      });
    }, typingSpeed); // Typing speed

    // Cleanup function to clear interval
    return () => clearInterval(intervalId);
  }, [textToType, typingSpeed]);



  
  return (
    <div className="preloader-container">
      <div className="preloader-spinner"></div>
      <div className="preloader-typed-text">{typedText}</div>
    </div>
  );
};

export default Preloader;
