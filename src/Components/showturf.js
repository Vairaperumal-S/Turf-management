// import React, { useEffect, useState } from 'react';
// import './showturf.css'

// const TurfList = () => {
//   const [turfs, setTurfs] = useState([]);

//   useEffect(() => {
//     fetchTurfs();
//   }, []);

//   const fetchTurfs = async () => {
//     try {
//       const response = await fetch('http://localhost:8001/api/Turf/get');
//       if (!response.ok) {
//         throw new Error('Failed to fetch turfs');
//       }
//       const data = await response.json();
//       // Filter out unavailable turfs (availability === 0)
//       const availableTurfs = data.filter(turf => turf.availability === 1);
//       setTurfs(availableTurfs);
//     } catch (error) {
//       console.error('Error fetching turfs:', error);
//     }
//   };

//   return (
//     <div  className="turf-list">
//       {turfs.map((turf) => (
//         <div key={turf._id} className="turf-item">
//           <h3>{turf.name}</h3>
//           <img 
//   src={`http://localhost:8001/${turf.imageURL}`} 
//   alt={turf.name} 
//   className="turf-image" 
// />

//           <p>{turf.description}</p>
//           <p>Location: {turf.location}</p>
//           <button>BOOK</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TurfList;






// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './showturf.css';
// import { Link } from 'react-router-dom';

// const TurfList = () => {
//   const [turfs, setTurfs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTurfs();
//   }, []);

//   const fetchTurfs = async () => {
//     try {
//       const response = await fetch('http://localhost:8001/api/Turf/get');
//       if (!response.ok) {
//         throw new Error('Failed to fetch turfs');
//       }
//       const data = await response.json();
//       const availableTurfs = data.filter(turf => turf.availability === 1);
//       setTurfs(availableTurfs);
//     } catch (error) {
//       console.error('Error fetching turfs:', error);
//     }
//   };

//   const handleBooking = (id) => {
//     navigate(`/bookturf/${id}`);
//     // <Link to={`/bookturf/${id}`}>Book Turf</Link>
//   };

//   return (
//     <div className="turf-list">
//       {turfs.map((turf) => (
//         <div key={turf._id} className="turf-item">
//           <h3>{turf.name}</h3>
//           {turf.imageUrl ? (
//                   <img
//                     src={`http://localhost:8001/${turf.imageUrl}`} // Adjust URL to match your server path
//                     alt={turf.name}
//                     style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                   />
//                 ) : (
//                   <span>No Image</span>
//                 )}
//           {/* <p>{turf.description}</p> */}
//           <p>Location: {turf.location}</p>
//           <button onClick={() => handleBooking(turf._id)}>BOOK</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TurfList;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './showturf.css';
import { Link } from 'react-router-dom';

const TurfList = () => {
  const [turfs, setTurfs] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/Turf/get');
      if (!response.ok) {
        throw new Error('Failed to fetch turfs');
      }
      const data = await response.json();
      const availableTurfs = data.filter(turf => turf.availability === 1);
      setTurfs(availableTurfs);
    } catch (error) {
      console.error('Error fetching turfs:', error);
    }
  };

  const handleBooking = (id) => {
    navigate(`/bookturf/${id}`);
  };

  const addreview = () => {
    navigate(`/review`);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter turfs based on location and search text
  const filteredTurfs = turfs.filter(turf => 
    turf.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="turf-list">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by location..." 
          value={search} 
          onChange={handleSearchChange} 
        />
      </div>

      <button onClick={addreview} className='but'>Add reviews</button>
      
      {filteredTurfs.map((turf) => (
        <div key={turf._id} className="turf-item">
          <h3>{turf.name}</h3>
          {turf.imageUrl ? (
            <img
              src={`http://localhost:8001/${turf.imageUrl}`} // Adjust URL to match your server path
              alt={turf.name}
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          ) : (
            <span>No Image</span>
          )}
          <p>Location: {turf.location}</p>
          <button onClick={() => handleBooking(turf._id)}>BOOK</button>
        </div>
      ))}
    </div>
  );
};

export default TurfList;
