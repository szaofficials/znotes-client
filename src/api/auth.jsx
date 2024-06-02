// auth.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState("");

  const [isFetching, setIsFetching] = useState(true);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken || "");
    }
  }, [token]);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;
  console.log("logged in", isLoggedIn);

  const LogoutStudent = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // JWT AUTHENTICATION - to get the data of the user thet is crrently logged in

  const userAuthentication = async () => {
    try {
      setIsFetching(true);
      // const response = await fetch(`${API}/api/student`, {
      const response = await fetch(`http://localhost:5000/api/student`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Response in fetching the user and token verification",response);
      if (response.ok) {
        const data = await response.json();
        // console.log("User data is ", data.studentData);
        setUser(data.studentData);
        setIsFetching(false);
      } else {
        console.log("User is not yet logged in");
        setIsFetching(false);
      }
    } catch (error) {
      console.error("Error fetching Student data");
    }

    // Check if token is expired
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      if (decodedToken.exp < currentTime) {
        LogoutStudent();
        toast.error("Session Timed Out! Please Login again");
      }
    } catch (error) {
      console.error("Error decoding token");
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutStudent, user, API, isFetching }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
