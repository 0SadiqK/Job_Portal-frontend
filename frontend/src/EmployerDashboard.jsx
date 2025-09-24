import React, { useState } from 'react';

function EmployerDashboard() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Job created successfully!');
        setFormData({ title: '', description: '', company: '', location: '', salary: '' }); // Clear form
      } else {
        setMessage(data.msg || 'Job creation failed.');
      }
    } catch (error) {
      setMessage('Server error during job creation.');
      console.error('Job creation error:', error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="text-center">Employer Dashboard</h1>
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Company:</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div>
          <label>Salary:</label>
          <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default EmployerDashboard;