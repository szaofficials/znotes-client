import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

const FeedbackForm = ({ user }) => {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsn(user.usn);
    }
  }, [user]);


  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = {
      "form-name": "feedback",
      usn,
      name,
      feedback,
    };

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData),
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

    setIsLoading(false);
  };
  return (
    <>
      <form
        style={formStyle}
        method="POST"
        name="feedback"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="feedback" />
        <h3 style={{ margin: "0" }}>Feedback:</h3>
        <p>
          Your opinion matters!
          <br />
          Help us enhance your experience by sharing your feedback.
        </p>

        <div className="form-group">
          <div className="inputbox">
            <input
              type="text"
              name="usn"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              required
              disabled
            />
            <span  style={spanStyle}>USN</span>
          </div>
          <div className="inputbox">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled
            />
            <span  style={spanStyle}>Name</span>
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
            type="submit"
            className="signup-btn-primary"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </>
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

const spanStyle = {
  color: "rgb(0, 0, 0)",
  transform: "translateX(10px) translateY(-7px)",
  fontSize:" 0.8em",
  padding: "0 8px",
  background: "rgba(255, 255, 255)",
  borderLeft: "1px solid rgb(0, 0, 0, 0.5)",
  borderRight: "1px solid rgb(0, 0, 0, 0.5)",
  letterSpacing:" 0.1em",
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
