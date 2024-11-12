// TurfForm.js
import React, { useState } from 'react';
import './Addturf.css'; // Import the CSS file

const TurfForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);




  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    const turfData = new FormData();
    turfData.append('name', name);
    turfData.append('description', description);
    turfData.append('location', location);
    turfData.append('image', image); // Append the image file

    try {
      const response = await fetch('http://localhost:8001/api/Turf/add', {
        method: 'POST',
        body: turfData, // Send FormData directly
      });

      if (!response.ok) {
        throw new Error('Failed to add turf');
      }

      const data = await response.json();
      console.log('Turf added:', data);

      // Reset form fields
      setName('');
      setDescription('');
      setLocation('');
      setImage(null);
    } catch (error) {
      console.error('Error adding turf:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the first selected file
  };

  return (
    <form className="turf-form" onSubmit={handleSubmit}>
      <h2>Add a New Turf</h2>
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
        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*" // Accept only image files
          onChange={handleImageChange}
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Turf</button>

    </form>
  );
};

export default TurfForm;
