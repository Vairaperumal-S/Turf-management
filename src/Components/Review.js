// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const Review = () => {
//     const [rating, setRating] = useState('');
//     const [error, setError] = useState('');
//   const { id } = useParams(); // Get the turf ID from the URL
//   const [turf, setTurf] = useState({});
//   const [reviewText, setReviewText] = useState('');
  
//   const [message, setMessage] = useState('');

//   // Fetch turf details based on the ID
//   useEffect(() => {
//     fetchTurfDetails();
//   }, []);

//   const fetchTurfDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:8001/api/turf/${id}`);
//       const data = await response.json();
//       setTurf(data);
//     } catch (error) {
//       console.error('Error fetching turf details:', error);
//     }
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();




    
//   const handleRatingChange = (e) => {
//     const value = e.target.value;

//     // Check if the value is a valid decimal or whole number between 1 and 5
//     // if (/^\d*\.?\d+$/.test(value) || value === '') {
//     //   const numericValue = parseFloat(value);

//       // Allow only values between 1 and 5 (inclusive)
//       if (value >= 1 && value <= 5) {
//         setRating(value);
//         setError('');  // Clear error message if the input is valid
//       } else if (value > 5) {
//         setError('Rating cannot be above 5');
//       } else {
//         setError('Rating cannot be less than 1');
//       }
//     }



    
//     try {
//       const response = await fetch(`http://localhost:8001/api/turf/${id}/review`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ reviewText, rating }),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setMessage('Review added successfully!');
//         setReviewText('');
//         setRating(0);
//       } else {
//         setMessage(result.message);
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       setMessage('Failed to submit review');
//     }
//   };





  

//   return (
//     <div className="review-page">
//       <h2>Review Turf</h2>

//       {/* Turf Details */}
//       <div className="turf-details">
   
//       </div>

//       {/* Review Form */}
//       <div>
//         <h3>Leave a Review</h3>
//         <form onSubmit={handleReviewSubmit}>
//           {/* Turf Name */}
//           <div className="form-group">
//             <label htmlFor="turfName">Turf Name:</label>
//             <input
//               id="turfName"
//               type="text"
//               value={turf.name || ''}
            
//             />
//           </div>

//           {/* Turf Location */}
//           <div className="form-group">
//             <label htmlFor="turfLocation">Location:</label>
//             <input
//               id="turfLocation"
//               type="text"
//               value={turf.location || ''}
              
//             />
//           </div>

//           {/* Review Text */}
//           <div className="form-group">
//             <label htmlFor="reviewText">Review Text:</label>
//             <textarea
//               id="reviewText"
//               value={reviewText}
//               onBlur={(e) => setReviewText(e.target.value)}
//               placeholder="Write your review"
//               required
//             />
//           </div>

//           {/* Rating */}
//           <div className="form-group">
//           <label htmlFor="rating">Rating:</label>
//           <input
//             id="rating"
//             type="text"
//             value={rating}
//             onChange={handleRatingChange}
//             placeholder="Enter rating (e.g., 4.5)"
//             required
//           />
//         </div>

//         {/* Show error message if rating is invalid */}
//         {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

//           <button type="submit">Submit Review</button>
//         </form>
//       </div>

//       {/* Success or error message */}
//       {message && <p>{message}</p>}
//     </div>
//   );
// }


// export default Review;





import React, { useState } from 'react';

const ReviewForm = ({ id, turf }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [username,setusername]=useState('')
  const[turfname,setname]=useState('');
  const [location,setlocation]=useState('')
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle Review Submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Validate rating before submitting
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5');
      return;
    }

    setError('');  // Clear any previous error

    try {
      const response = await fetch(`http://localhost:8001/api/review/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username,turfname,location,reviewText, rating }),
      });
      const result = await response.json();

      if (response.ok) {
        setMessage('Review added successfully!');
        setReviewText('');
        setname('');
        setlocation('');
        setusername('');
        setRating('');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage('Failed to submit review');
    }
  };



  return (
    <div className="review-form">
      <div className="review-page">
       

     
       
        {/* Review Form */}
        <h3>Leave a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          {/* Turf Name */}
          <div className="form-group">
            <label htmlFor="turfName">Turf Name:</label>
            <input
              id="turfName"
              type="text"
              value={turfname}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter the turf name....."
              required
              
            />
          </div>







          <div className="form-group">
            <label htmlFor="usernamae">User Name:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="Enter the user name....."
              required
              
            />
          </div>

          {/* Turf Location */}
          <div className="form-group">
            <label htmlFor="turfLocation">Location:</label>
            <input
              id="turfLocation"
              type="text"
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              placeholder="Enter the turf location...."
              required
              
            />
          </div>

          {/* Review Text */}
          <div className="form-group">
            <label htmlFor="reviewText">Review Text:</label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review"
              required
            />
          </div>

          {/* Rating */}
          <div className="form-group">
  <label htmlFor="rating">Rating (1 to 5):</label>
  <input
    id="rating"
    type="number"
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    placeholder="Enter rating (1-5)"
    min="1"
    max="5"
    required
  />
       {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
</div>

       
          

          <button type="submit">Submit Review</button>
        </form>

        {/* Success or error message */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ReviewForm;
