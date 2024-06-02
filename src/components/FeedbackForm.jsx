import React, { useState } from "react";
import Spinner from "./Spinner";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Here you can send the feedback data to a server or do something else with it
    // console.log("Name:", name);
    // console.log("USN:", usn);
    // console.log("Feedback:", feedback);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          usn,
          name,
          feedback,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setName("");
      setUsn("");
      setFeedback("");
      alert("Thank you for your valuable feedback!");
    } catch (error) {
      alert(error);
    }

    // // Optionally, you can clear the form fields after submission
    // setName("");
    // setUsn("");
    // setFeedback("");

    setIsLoading(false);
    // Display a thank you message or any other feedback to the user
    // alert("Thank you for your feedback!");
  };

  return (
    <form  style={formStyle}   method="POST"
    data-netlify="true" 
    onSubmit={handleSubmit}>
       <input type="hidden" name="znotesfeedback" value="feedback" />
      <h3 style={{margin:'0'}}>Feedback:</h3>
      <p>Your opinion matters!<br/>
Help us enhance your experience by sharing your feedback.</p>
     
      <div className="form-group">
        <div className="inputbox">
         
          <input
            type="text" name="usn"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
           
            required
          />
          <span>USN</span>
        </div>
        <div className="inputbox">
          <input
            type="text" name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
            required
          />
          <span>Name</span>
        </div>
      </div>
     
      
        <textarea
          id="feedback"
         name="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="4"
          placeholder="Your Message"
          style={textareaStyle}
          required
          
        />
        
    

      <div className="signup-btn-container">
        <button
          className="signup-btn-primary"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Submit"}
        </button>
      </div>

     
    </form>
  );
};

// CSS Styles
const formStyle = {
  maxWidth: "500px",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f9f9f9",
};


const textareaStyle = {
  width: "98%",
  padding: "10px",
  margin: "10px 10px 20px 0",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  borderRadius: "5px",
  boxSizing: "border-box",
};


export { FeedbackForm };
