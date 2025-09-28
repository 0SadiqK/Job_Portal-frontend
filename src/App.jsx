import { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import JobSeekerDashboard from './JobSeekerDashboard';
import EmployerDashboard from './EmployerDashboard';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
          setIsLoggedIn(true);
          setUser(JSON.parse(storedUser));
        }
        // Mock job data since backend is not available
        const mockJobs = [
          {
            id: 1,
            title: 'Frontend Developer',
            company: 'Tech Corp',
            location: 'San Francisco, CA'
          },
          {
            id: 2,
            title: 'Backend Engineer',
            company: 'StartupXYZ',
            location: 'New York, NY'
          },
          {
            id: 3,
            title: 'Full Stack Developer',
            company: 'Innovation Labs',
            location: 'Austin, TX'
          },
          {
            id: 4,
            title: 'UI/UX Designer',
            company: 'Design Studio',
            location: 'Los Angeles, CA'
          },
          {
            id: 5,
            title: 'Data Scientist',
            company: 'Analytics Inc',
            location: 'Seattle, WA'
          }
        ];
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setJobs(mockJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleLoginSuccess = () => {
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(true);
    setUser(JSON.parse(storedUser));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (currentPage === 'login') {
      return <Login onLoginSuccess={handleLoginSuccess} />;
    }
    if (currentPage === 'register') {
      return <Register />;
    }
    if (currentPage === 'dashboard') {
      if (user && user.role === 'employer') {
        return <EmployerDashboard />;
      }
      if (user && user.role === 'user') {
        return <JobSeekerDashboard />;
      }
    }
    
    // Home page view
    return (
      <div className="page-container">
        <h1>Job Listings</h1>
        {isLoggedIn && <p className="text-center">Welcome, {user.name}!</p>}
        {jobs.length > 0 ? (
          <ul className="job-listings">
            {jobs.map((job) => (
              <li key={job.id} className="job-card">
                <h2>{job.title}</h2>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No jobs found.</p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <nav>
        <a href="#" onClick={() => setCurrentPage('home')}>Home</a>
        {!isLoggedIn ? (
          <>
            <a href="#" onClick={() => setCurrentPage('login')}>Login</a>
            <a href="#" onClick={() => setCurrentPage('register')}>Register</a>
          </>
        ) : (
          <>
            <a href="#" onClick={() => setCurrentPage('dashboard')}>Dashboard</a>
            <a href="#" onClick={handleLogout}>Logout</a>
          </>
        )}
      </nav>
      {renderPage()}
    </div>
  );
}