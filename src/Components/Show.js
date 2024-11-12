import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Show.css';
const ShowTurf = () => {
  const [turfs, setTurfs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate

  // Fetch turfs from the server
  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/Turf/get'); // Adjust URL as needed
        if (!response.ok) throw new Error('Failed to fetch turfs');
        const data = await response.json();
        setTurfs(data);
      } catch (error) {
        setErrorMessage('Could not load turfs');
      }
    };
    fetchTurfs();
  }, []);

  // Navigate to Modify page with turfId
  const modifyTurf = (turfId) => {
    // Navigate to the Modify page and pass the turfId as part of the URL
    navigate(`/modify/${turfId}`);
  };

  return (
    <div>
      <h1>Modify Turf</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Image</th> {/* New Image column */}
            <th>Actions</th> {/* Action column for modify */}
          </tr>
        </thead>
        <tbody>
          {turfs.map((turf) => (
            <tr key={turf._id}>
              <td>{turf.name}</td>
              <td>{turf.location}</td>
              <td>
                {turf.imageUrl ? (
                  <img
                    src={`http://localhost:8001/${turf.imageUrl}`} // Adjust URL to match your server path
                    alt={turf.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>
                {/* Modify button */}
                <button
                  onClick={() => modifyTurf(turf._id)} // Navigate to Modify page
                  style={{ background: 'green', border: 'none', cursor: 'pointer' }}
                >
                  MODIFY
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTurf;
