import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function Confetti() {
  // Simple confetti using SVG shapes (for lightweight effect)
  const [pieces] = useState(
    Array.from({ length: 40 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: ['#00bcd4', '#2196f3', '#ff9800', '#4caf50', '#9c27b0'][Math.floor(Math.random()*5)]
    }))
  );
  return (
    <div className="confetti">
      {pieces.map((p, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          style={{
            position: 'absolute',
            left: `${p.left}vw`,
            top: 0,
            animation: `fall 2.5s linear ${p.delay}s 1`,
            opacity: 0.85
          }}
        >
          <rect width="12" height="12" fill={p.color} rx="2" />
        </svg>
      ))}
      <style>{`
        @keyframes fall {
          0% { top: -2em; opacity: 0.7; }
          80% { opacity: 1; }
          100% { top: 100vh; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    cgpa: '',
    skills: [],
    careerGoal: '',
    interest: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const skillsList = [
    'Python', 'JavaScript', 'Java', 'HTML', 'CSS', 'React', 'Node.js',
    'Machine Learning', 'Data Structures', 'DBMS', 'Networking', 'Linux',
    'Cybersecurity', 'Cloud Computing', 'Statistics', 'Blockchain'
  ];

  const interestsList = [
    'AI/ML', 'Web Development', 'Cybersecurity', 'Data Science',
    'Mobile App Development', 'Cloud Computing'
  ];

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => console.log('No users data available'));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (skill) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter((s) => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowConfetti(false);
    try {
      const res = await axios.post('http://localhost:5000/analyze', formData);
      setResult({ ...res.data, cgpa: formData.cgpa });
      setTimeout(() => setShowConfetti(true), 300); // show confetti after result
    } catch (error) {
      alert('Error connecting to backend');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Poppins, Segoe UI, Arial, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      <div className="glass-card">
        <h2 style={{ textAlign: 'center', color: '#2d3a4b', marginBottom: '24px', letterSpacing: '1px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09v6L12 21l-7-3.82v-6L1 9l11-6z"/>
          </svg>
          AI Skill Gap Analyzer
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Name:
            </label><br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '7px', border: '1px solid #bfc9d1', marginTop: '6px', fontSize: '15px' }}
            />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              CGPA:
            </label><br />
            <input
              type="number"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.01"
              required
              placeholder="e.g. 8.5"
              style={{ width: '100%', padding: '10px', borderRadius: '7px', border: '1px solid #bfc9d1', marginTop: '6px', fontSize: '15px' }}
            />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
              </svg>
              Skills:
            </label><br />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '6px' }}>
              {skillsList.map((skill) => (
                <label key={skill} style={{ background: formData.skills.includes(skill) ? '#e0f7fa' : '#f4f6fb', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '14px', border: formData.skills.includes(skill) ? '1.5px solid #00bcd4' : '1px solid #dbeafe' }}>
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleCheckboxChange(skill)}
                    style={{ marginRight: '6px' }}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Career Goal:
            </label><br />
            <input
              type="text"
              name="careerGoal"
              value={formData.careerGoal}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', borderRadius: '7px', border: '1px solid #bfc9d1', marginTop: '6px', fontSize: '15px' }}
            />
          </div>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
              </svg>
              Interest Area:
            </label><br />
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '7px', border: '1px solid #bfc9d1', marginTop: '6px', fontSize: '15px', background: '#f4f6fb' }}
            >
              <option value="">-- Select Interest --</option>
              {interestsList.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="animated-btn"
            disabled={loading}
          >
            {loading ? <span className="loader"></span> : 'Analyze My Skills'}
          </button>
        </form>
        {result && (
          <div style={{ marginTop: '32px', background: 'rgba(224,247,250,0.7)', borderRadius: '14px', padding: '24px 18px', boxShadow: '0 4px 16px 0 rgba(0,188,212,0.07)', position: 'relative', overflow: 'hidden' }}>
            <h3 style={{ color: '#007bff', marginBottom: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Hello {result.name}!
            </h3>
            <div style={{ marginBottom: '10px', fontSize: '15px' }}>
              <strong>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                CGPA:
              </strong> 
              <span style={{ color: '#009688', fontWeight: 600 }}>{result.cgpa}</span>
            </div>
            <div style={{ marginBottom: '10px', fontSize: '15px' }}>
              <strong>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Learning Level:
              </strong> 
              <span style={{ 
                color: result.learning_level === 'advanced' ? '#4caf50' : 
                       result.learning_level === 'intermediate' ? '#ff9800' : '#f44336', 
                fontWeight: 600,
                textTransform: 'capitalize'
              }}>
                {result.learning_level}
              </span>
            </div>
            {result.message && (
              <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(76,175,80,0.1)', borderRadius: '8px', border: '1px solid rgba(76,175,80,0.2)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle', color: '#4caf50' }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span style={{ color: '#2e7d32', fontSize: '14px' }}>{result.message}</span>
              </div>
            )}
            <div style={{ marginBottom: '10px' }}>
              <strong>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                Missing Skills:
              </strong>
              <ul style={{ margin: '6px 0 0 18px' }}>
                {result.missing_skills.map((skill, idx) => (
                  <li key={idx} style={{ color: '#e65100', fontWeight: 500 }}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09v6L12 21l-7-3.82v-6L1 9l11-6z"/>
                </svg>
                Recommended Courses ({result.learning_level} level):
              </strong>
              <ul style={{ margin: '6px 0 0 18px' }}>
                {result.recommended_courses.map((course, idx) => (
                  <li key={idx} style={{ color: '#1976d2', fontWeight: 500 }}>{course}</li>
                ))}
              </ul>
            </div>
            {showConfetti && <Confetti />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
