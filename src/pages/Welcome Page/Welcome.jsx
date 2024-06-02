import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Welcome = () => {
    const navigate = useNavigate();
    const { user, isFetching } = useAuth();
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
      // Show the welcome message immediately
      setShowWelcome(true);

      // Set a delay to redirect only if fetching is complete
      const timeout = setTimeout(() => {
          if (!isFetching) {
              navigate(`/Home/${user.department.deptId}/${user.scheme.scheme}/${user.semester.semName}`);
          }
      }, 2200); // Adjust the delay time as needed

      // Cleanup function
      return () => clearTimeout(timeout);
  }, [isFetching, navigate, user]);


    // Define styles for the spinner container
    const faspinnerContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
    };

   
    const headingStyle = {
     
        fontSize: '2rem',
        marginBottom: '20px',
        marginLeft: '20px',
        color: '#333'
    };

    return (
        <div className='welcomePage'> 
            { showWelcome && ( // Show loading indicator if fetching is in progress
                <div style={faspinnerContainerStyle}>
                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" size="3x" />
                    <h1 style={headingStyle}>Welcome to Z-Notes <br/> Your Engineering Companion for Success!</h1>
                </div>
          
                
            )}
        </div>
    );
};

export { Welcome };
