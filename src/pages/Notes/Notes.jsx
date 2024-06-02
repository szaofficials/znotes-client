import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadNote.css';

const UploadNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [batches, setBatches] = useState([]);
  const [departmentId, setDepartmentId] = useState('');
  const [semesterId, setSemesterId] = useState('');
  const [batchId, setBatchId] = useState('');

  useEffect(() => {
    // Fetch departments, semesters, and batches on component mount
    axios.get('/api/departments').then(response => setDepartments(response.data));
    axios.get('/api/semesters').then(response => setSemesters(response.data));
    axios.get('/api/batches').then(response => setBatches(response.data));
  }, []);

  const handleUpload = async () => {
    const newNote = {
      title,
      content,
      departmentId,
      semesterId,
      batchId,
    };
    
    try {
      await axios.post('/api/notes', newNote);
      alert('Note uploaded successfully');
    } catch (error) {
      console.error('Error uploading note:', error);
      alert('Failed to upload note');
    }
  };

  return (
    <div className="upload-note">
      <h2>Upload Note</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Department</label>
        <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept._id} value={dept._id}>{dept.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Semester</label>
        <select value={semesterId} onChange={(e) => setSemesterId(e.target.value)} required>
          <option value="">Select Semester</option>
          {semesters.map(sem => (
            <option key={sem._id} value={sem._id}>{sem.semNum}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Batch</label>
        <select value={batchId} onChange={(e) => setBatchId(e.target.value)} required>
          <option value="">Select Batch</option>
          {batches.map(batch => (
            <option key={batch._id} value={batch._id}>{batch.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleUpload}>Upload Note</button>
    </div>
  );
};

export default UploadNote;
