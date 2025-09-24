import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Please log in.');
      } else {
        setMessage(data.msg || 'Registration failed.');
      }
    } catch (error) {
      setMessage('Server error during registration.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="page-container">
      <h1 className="text-center">Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
}

export default Register;