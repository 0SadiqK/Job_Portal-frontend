import React, { useState, useEffect } from 'react';

function JobSeekerDashboard() {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    age: '',
    qualification: '',
    pros: '',
    specialities: '',
    contact_info: '',
    job_searching_for: '',
    social_media_links: '',
    bio: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/users/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setProfile(data);
        setFormData({
          age: data.age || '',
          qualification: data.qualification || '',
          pros: data.pros || '',
          specialities: data.specialities || '',
          contact_info: data.contact_info || '',
          job_searching_for: data.job_searching_for || '',
          social_media_links: data.social_media_links || '',
          bio: data.bio || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Profile updated successfully!');
        setProfile(data.user);
      } else {
        setMessage(data.msg || 'Profile update failed.');
      }
    } catch (error) {
      setMessage('Server error during profile update.');
      console.error('Profile update error:', error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading profile...</div>;
  }

  return (
    <div className="page-container">
      <h1 className="text-center">My Profile</h1>
      {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      <div className="profile-details">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Age:</strong> {profile.age || 'Not provided'}</p>
        <p><strong>Qualification:</strong> {profile.qualification || 'Not provided'}</p>
        <p><strong>Pros:</strong> {profile.pros || 'Not provided'}</p>
        <p><strong>Specialities:</strong> {profile.specialities || 'Not provided'}</p>
        <p><strong>Contact Info:</strong> {profile.contact_info || 'Not provided'}</p>
        <p><strong>Looking for:</strong> {profile.job_searching_for || 'Not provided'}</p>
        <p><strong>Social Media:</strong> {profile.social_media_links || 'Not provided'}</p>
        <p><strong>Bio:</strong> {profile.bio || 'Not provided'}</p>
      </div>

      <h3>Update Profile</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
        </div>
        <div>
          <label>Qualification:</label>
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" />
        </div>
        <div>
          <label>Pros:</label>
          <textarea name="pros" value={formData.pros} onChange={handleChange} placeholder="Pros"></textarea>
        </div>
        <div>
          <label>Specialities:</label>
          <textarea name="specialities" value={formData.specialities} onChange={handleChange} placeholder="Specialities"></textarea>
        </div>
        <div>
          <label>Contact Info:</label>
          <input type="text" name="contact_info" value={formData.contact_info} onChange={handleChange} placeholder="Contact Info" />
        </div>
        <div>
          <label>Looking for:</label>
          <input type="text" name="job_searching_for" value={formData.job_searching_for} onChange={handleChange} placeholder="Job Searching For" />
        </div>
        <div>
          <label>Social Media Links:</label>
          <input type="text" name="social_media_links" value={formData.social_media_links} onChange={handleChange} placeholder="Social Media Links" />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default JobSeekerDashboard;