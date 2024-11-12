import React, { useState, useEffect } from 'react';
//import './Deleteturf.css'
const DeleteTurf = () => {
  const [turfs, setTurfs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  // Delete a turf
  const deleteTurf = async (turfId) => {
    try {
      const response = await fetch(`http://localhost:8001/api/Turf/delete/${turfId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete turf');

      // Remove the deleted turf from the state
      setTurfs(turfs.filter((turf) => turf._id !== turfId));
    } catch (error) {
      setErrorMessage('Error deleting turf');
    }
  };

  return (
    <div>
      <h1>Delete Turf</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Description</th> */}
            <th>Location</th>
            <th>Image</th> {/* New Image column */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {turfs.map((turf) => (
            <tr key={turf._id}>
              <td>{turf.name}</td>
              {/* <td>{turf.description}</td> */}
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
                <button
                  onClick={() => deleteTurf(turf._id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteTurf;
