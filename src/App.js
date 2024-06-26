import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DeviceSizeProvider } from './Context/DeviceSizeContext';
import { Home } from './pages/Home/Home';
import { Notes } from './pages/Notes';
import { Dss } from './pages/Dss/Dss';
import { SignUp } from './pages/Signup/SignUp';
import UserProfile from './pages/Profile Page/Profile';
import { Logout } from './pages/Logout Page/Logout';
import { useAuth } from './api/auth';
import { Error } from './pages/Error/Error';
import { Welcome } from './pages/Welcome Page/Welcome';
import { SubjectPage } from "./pages/Subject Pages/SubjectPage";
import { PdfViewer } from './pages/PDF/PdfViewer';
import StudentsList from './pages/All Students/StudentsList';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const { isLoggedIn, user } = useAuth();

  // Function to determine the initial home path based on user.isAdmin
  const getInitialHomePath = () => {
    if (isLoggedIn && user && user.isOwner) {
      return '/Admin/Dashboard';
    } else if (isLoggedIn && user) {
      return `/Home/${user.department.deptId}/${user.scheme.scheme}/${user.semester.semName}`;
    } else {
      return '/Home/:department/:scheme/:semester';
    }
  };

  return (
    <DeviceSizeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />} >
            <Route path="/Admin/StudentsList" element={<StudentsList />} />
            <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
            <Route
            path="/Admin/:department/:scheme/:semester"
            element={<Home />}
          />
           <Route
            path="/Admin/:department/:scheme/:semester/:subCode"
            element={<SubjectPage />}
          />
          </Route>

          <Route path="/DSS" element={<Notes />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="*" element={<Error />} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/" element={<Dss />} />
          <Route
            path={getInitialHomePath()}
            element={<Home />}
          />
          <Route
            path="/Home/:department/:scheme/:semester/:subCode"
            element={<SubjectPage />}
          />
          <Route
            path={`/Profile/${user.usn ? user.usn : ''}`}
            element={<UserProfile />}
          />
          <Route
            path={`/pdfViewer/:pdfFileName`}
            element={<PdfViewer />}
          />





          {/* {isLoggedIn && user ? (
            <Route
              path={`/Home/${user.department.deptId}/${user.scheme.scheme}/${user.semester.semName}`}
              element={<Home />}
            />
          ) : (
            <Route path="/Home/:department/:scheme/:semester" element={<Home />} />
          )} */}



        </Routes>
      </BrowserRouter>
    </DeviceSizeProvider>
  );
};

export default App;


