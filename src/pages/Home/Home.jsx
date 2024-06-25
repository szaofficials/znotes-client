import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useDeviceSize } from "../Context/DeviceSizeContext";
import { useAuth } from "../../api/auth";
import "./Home.css";
import Preloader from "../../components/Preloader/Preloader";
import Layout from "../../components/Layout/Layout";
import { FeedbackForm } from "../../components/FeedbackForm";
import { useDeviceSize } from "../../Context/DeviceSizeContext";

const Home = () => {
  const { department, scheme, semester } = useParams();
  // const { isMobile } = useDeviceSize();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, user } = useAuth();
  const [userData, setUserData] = useState(null);
  const { isMobile } = useDeviceSize();
  const [visibleCount, setVisibleCount] = useState(2);

  const responsiblePersons = [
    "Basavakiran Bandi (CSE)",
    "Kaneez Fatima (CSE)",
    "Hasan (CSE)",
    "Mohd Idris (Civil)",
    "Nageshwari Patil (ECE)",
    "Shruti Shetty (EEE)",
    "Sukanya Bhushetty (CSE)",
    "Tauz ul Imam (CSE)",
    "Syed Arifuddin (EEE)",
    "Eshwari Allur(EEE)",
    "Sujeet Kollure (ECE)",
    "Syed Shoaib Akhtar (CSE)",
  ];

  const showAll = () => {
    setVisibleCount(responsiblePersons.length);
  };

  const showLess = () => {
    setVisibleCount(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Check if user is logged in
        if (isLoggedIn) {
          setUserData(user);
        } else if (department && semester && scheme) {
          // If not logged in, use selected options
          setUserData({
            department: { deptId: department }, // Use selected department
            scheme: { scheme: scheme }, // Use selected scheme
            semester: { semName: semester }, // Use selected semester
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state here if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [department, scheme, semester, isLoggedIn, user]);

  if (!userData || isLoading) {
    return <Preloader />;
  }

  return (
    <Layout>
      <div>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <div className="SubjectPage">
              <div className="search-container">
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Search notes..."
                />
              </div>
              <div className="subjectContainer">
                <div className="subject-title">
                  Study Material For : {userData.department.deptId} -{" "}
                  {userData.semester.semName}-{userData.scheme.scheme}
                </div>

                <section className="subSection">
                  <div className="sectionTitle">
                    <h4>
                      Welcome, {user.name} ! We're delighted to have you here.
                    </h4>
                  </div>
                  <iframe
                    title="Calander"
                    src="https://calendar.google.com/calendar/embed?height=100&wkst=1&ctz=UTC&bgcolor=%23ffffff&showTitle=0&src=N2U0YTQyNDM4YmYzZTNmYTg4YmNhYTczY2RjMzQ0ZDYwNDAzMjcxNTAxOGViNzRhYjJiOTM3OTUxYTY2ZDM5MkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%237CB342&color=%230B8043"
                    className="googleCalender"
                    border="solid 1px #777"
                    width="100%"
                    height="100%"
                    frameborder="0"
                   
                  ></iframe>
                </section>

                <section className="subSection">
                  <div
                    style={{
                      height: "335px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      color: "green",
                    }}
                  >
                    <p>
                      You are on the Home Page <br />
                      The Best Possible Content will be added here very soon.
                      Till then you may explore the subjects
                    </p>
                  </div>
                </section>
                <section className="subSection">
                  <FeedbackForm />
                </section>
                <section id="about-us" className="subSection">
                  <h2>About Us</h2>
                  <p>
                    We're students just like you, striving to make academic life
                    easier. This website was created to provide a platform for
                    students to voice their concerns and suggestions.
                  </p>
                  <h3 style={{ margin: "5px 0" }}>Z-Notes.in</h3>
                  Design and Developed by :{" "}
                  {isMobile && (
                    <a
                      href="https://zfolio.netlify.app/"
                      style={{
                        display: "block",
                        textAlign:'center',
                        marginTop: "5px",
                      }}
                    >
                      <strong>Syed Zeeshan Patel</strong>{" "}
                    </a>
                  )}
                  {!isMobile && (
                  <a
                    href="https://zfolio.netlify.app/"
                    style={{ color: "green" }}
                  >
                    <strong>Syed Zeeshan Patel</strong>{" "}
                  </a>)}
                  <div className="responsible-persons">
                    <h3 style={{ margin: "5px 0" }}>Responsible Persons : </h3>
                    <ul className="responsible-list">
                      {responsiblePersons
                        .slice(0, visibleCount)
                        .map((person, index) => (
                          <li key={index}>{person}</li>
                        ))}

                      {visibleCount === 2 ? (
                        <li className="view-all-btn" onClick={showAll} style={{border:'none'}}>
                          <u> View All</u>
                        </li>
                      ) : (
                        <li className="view-all-btn" onClick={showLess} style={{border:'none'}}>
                          <u> Show Less</u>
                        </li>
                      )}
                    </ul>
                  </div>
                </section>

                <section id="resources" className="subSection">
                  <h2>Resources</h2>
                  <ul>
                    <li>
                      <a href="sm.html">Study Materials</a>
                    </li>
                    <li>
                      <a href="as.html">Academic Support</a>
                    </li>
                    <li>
                      <a href="ep.html">Exam Preparation</a>
                    </li>
                  </ul>
                </section>

                <section id="contact" className="subSection">
                  <h2>Contact Us</h2>
                  <h4>Have a Query?</h4>
                  <a href="https://wa.me/7829589843">Contact us</a>
                  <p>
                    Have questions or need assistance? Feel free to reach out to
                    us via email at:
                    <a href="mailto:support@znotes.in">
                      {" "}
                      support@znotes.in
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export { Home };
