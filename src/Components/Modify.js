// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './Modify.css'

// const Modify = () => {
//   const { turfId } = useParams(); 
//   console.log(turfId)
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [availability, setAvailability] = useState('');
//   const [image, setImage] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     // Fetch turf details to pre-fill the form
//     const fetchTurfDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8001/api/Turf/get/${turfId}`);
//         const data = await response.json();
//         if (data.success) {
//           setName(data.turf.name);
//           setDescription(data.turf.description);
//           setLocation(data.turf.location);
//           setAvailability(data.turf.availability);
//         } else {
//           setErrorMessage('Turf not found');
//         }
//       } catch (error) {
//         setErrorMessage('Error fetching turf details');
//       }
//     };

//     if (turfId) {
//       fetchTurfDetails();
//     }
//   }, [turfId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const turfData = new FormData();
//     turfData.append('name', name);
//     turfData.append('description', description);
//     turfData.append('location', location);
//     turfData.append('availability', availability);
//     if (image) turfData.append('image', image);

//     try {
//       const response = await fetch(`http://localhost:8001/api/Turf/modify/${turfId}`, {
//         method: 'PUT',
//         body: turfData,
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccessMessage('Turf details updated successfully!');
//         setErrorMessage('');
//       } else {
//         setErrorMessage('Failed to update turf details');
//         setSuccessMessage('');
//       }
//     } catch (error) {
//       setErrorMessage('Error updating turf details');
//       setSuccessMessage('');
//     }
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <div className="modify-turf-container">
//       <h2>Modify Turf Details</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label htmlFor="name">Turf Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>

//         <div className="form-group">
//           <label htmlFor="location">Location:</label>
//           <input
//             type="text"
//             id="location"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="availability">Availability:</label>
//           <input
//             type="number"
//             id="availability"
//             value={availability}
//             onChange={(e) => setAvailability(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Upload New Image (optional):</label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </div>

//         <button type="submit">Modify Turf</button>
//       </form>
//     </div>
//   );
// };

// export default Modify;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './Modify.css';

// const Modify = () => {
//   const { turfId } = useParams(); 
//   console.log(turfId);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [availability, setAvailability] = useState('');
//   const [image, setImage] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(true); // To handle loading state

//   useEffect(() => {
//     // Fetch turf details to pre-fill the form
//     const fetchTurfDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8001/api/Turf/get/${turfId}`);
//         const data = await response.json();
//         if (data.success) {
//           setName(data.turf.name);
//           setDescription(data.turf.description);
//           setLocation(data.turf.location);
//           setAvailability(data.turf.availability);
//         } else {
//           setErrorMessage('Turf not found');
//         }
//       } catch (error) {
//         setErrorMessage('Error fetching turf details');
//       } finally {
//         setIsLoading(false); // Stop loading when request is done
//       }
//     };

//     if (turfId) {
//       fetchTurfDetails();
//     }
//   }, [turfId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const turfData = new FormData();
//     turfData.append('name', name);
//     turfData.append('description', description);
//     turfData.append('location', location);
//     turfData.append('availability', availability);
//     if (image) turfData.append('image', image);

//     try {
//       const response = await fetch(`http://localhost:8001/api/Turf/modify/${turfId}`, {
//         method: 'PUT',
//         body: turfData,
//       });

//       const data = await response.json();

//       if (data.success) {
//         setSuccessMessage('Turf details updated successfully!');
//         setErrorMessage('');
//       } else {
//         setErrorMessage('Failed to update turf details');
//         setSuccessMessage('');
//       }
//     } catch (error) {
//       setErrorMessage('Error updating turf details');
//       setSuccessMessage('');
//     }
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   return (
//     <div className="modify-turf-container">
//       <h2>Modify Turf Details</h2>
//       {isLoading && <p>Loading...</p>}
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}

//       {/* Render the form only if not loading */}
//       {!isLoading && (
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="form-group">
//             <label htmlFor="name">Turf Name:</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             ></textarea>
//           </div>

//           <div className="form-group">
//             <label htmlFor="location">Location:</label>
//             <input
//               type="text"
//               id="location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="availability">Availability:</label>
//             <input
//               type="number"
//               id="availability"
//               value={availability}
//               onChange={(e) => setAvailability(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="image">Upload New Image (optional):</label>
//             <input
//               type="file"
//               id="image"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>

//           <button type="submit">Modify Turf</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Modify;










import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Modify.css';

const Modify = () => {
  const { turfId } = useParams(); 
  console.log(turfId);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

//   useEffect(() => {
//     // Fetch turf details to pre-fill the form
//     const fetchTurfDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8001/api/Turf/get/${turfId}`);
//         if (!response.ok) {
//           throw new Error('Turf not found'); // Handle non-200 responses
//         }
//         const data = await response.json();
//         if (data.success) {
//           setName(data.turf.name);
//           setDescription(data.turf.description);
//           setLocation(data.turf.location);
//           setAvailability(data.turf.availability);
//         } else {
//           setErrorMessage('Turf not found'); // API response failure
//         }
//       } catch (error) {
//         if (error.message === 'Turf not found') {
//           setErrorMessage(error.message); // Specific error when turf not found
//         } else {
//           setErrorMessage('Error fetching turf details'); // Generic error message
//         }
//       } finally {
//         setIsLoading(false); // Stop loading when request is done
//       }
//     };

//     if (turfId) {
//       fetchTurfDetails();
//     }
//   }, [turfId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const turfData = new FormData();
    turfData.append('name', name);
    turfData.append('description', description);
    turfData.append('location', location);
    turfData.append('availability', availability);
    if (image) turfData.append('image', image);

    try {
      const response = await fetch(`http://localhost:8001/api/Turf/modify/${turfId}`, {
        method: 'PUT',
        body: turfData,
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Turf details updated successfully!');
        setErrorMessage('');
        setName('');
        setDescription('');
        setAvailability('');
        setLocation('');
        setImage(null);


      } else {
        setErrorMessage('Failed to update turf details');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error updating turf details');
      setSuccessMessage('');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="modify-turf-container">
      <h2>Modify Turf Details</h2>
      {/* {isLoading && <p>Loading...</p>} */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Render the form only if not loading */}
       {!errorMessage && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Turf Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="availability">Availability:</label>
            <input
              type="number"
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload New Image (optional):</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit">Modify Turf</button>
        </form>
      )}
    </div>
  );
};

export default Modify;
