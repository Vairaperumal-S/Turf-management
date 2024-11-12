import React, { useEffect, useState } from 'react';
import './showreview.css';  // Import the CSS file

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/review/get`);
        const data = await response.json();

        if (response.ok) {
          setReviews(data.reviews);
        } else {
          setError(data.message || 'Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews');
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="review-container">
      <h1>All Reviews</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="reviews-table">
        <thead>
          <tr>
          <th>User Name</th>
            <th>Turf Name</th>
            <th>Location</th>
            <th>Review Text</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <tr key={index}>
              <td>{review.username}</td>
                <td>{review.turfname}</td>
                <td>{review.location}</td>
                <td>{review.reviewText}</td>
                <td>{review.rating}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No reviews available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowReview;
