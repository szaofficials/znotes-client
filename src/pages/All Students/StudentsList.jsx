import React, { useState, useEffect } from "react";
import { useAuth } from "../../api/auth";
import "./StudentList.css";
import Layout from "../../components/Layout/Layout";

const Student = ({ student }) => {
  return (
    <tr>
      <td>{student.usn}</td>
      <td>{student.name}</td>
      <td>{student.gender}</td>
      <td>{student.department.deptId}</td>
      <td>{student.semester.semName}</td>
      <td>{student.contact}</td>
      <td>{student.email}</td>
      <td>{new Date(student.dob).toLocaleDateString()}</td>
      <td>{student.password}</td>
      <td>{student.scheme.scheme}</td>
      <td>{student.college.clgName}</td>
      <td>{new Date(student.registeredAt).toLocaleString()}</td>
      <td>{String(student.isAdmin)}</td>
    </tr>
  );
};

const StudentsList = () => {
  const { API } = useAuth();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API}/api/getAllStudents`);
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        setStudents(data);
        setTotalStudents(data.length);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [API]);

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.contact.includes(searchTerm)
    );
  });

  return (
    <Layout>
      <div className="student-list-container">
        <h1 className="title">All Students</h1>
        <div className="search-container">
          <input
            id="searchInput"
            type="text"
            placeholder="Search by name, USN, or mobile number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <p className="total-students">Total Students: {totalStudents}</p>
        <table className="student-table">
          <thead>
            <tr>
              <th>USN</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Password</th>
              <th>Scheme</th>
              <th>College</th>
              <th>Registered At</th>
              <th>isAdmin</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(
              (
                student // Use filteredStudents here
              ) => (
                <Student key={student._id["$oid"]} student={student} />
              )
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default StudentsList;
