



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Bookturf.css'

const BookTurf = () => {
  const { turfId } = useParams(); // Get turfId from URL
  const navigate = useNavigate();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [duration, setDuration] = useState(1); // Default to 1 hour
  const [totalAmount, setTotalAmount] = useState(100); // Default amount
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    console.log(turfId);
    fetch(`http://localhost:8002/api/Turf/available-slots/${turfId}`)
      .then((response) => response.json())
      .then((data) => {
        setAvailableSlots(data); // Set available slots for the selected turf
      })
      .catch((error) => {
        setErrorMessage('Error fetching available slots.');
      });
  }, [turfId]);

  // Handle slot selection
  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  // Handle duration change and update total amount
  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value, 10);
    setDuration(newDuration);
    setTotalAmount(newDuration * 100); // Update amount based on duration
  };

  // Handle form submission for booking
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!selectedSlot) {
      setErrorMessage('Please select a time slot.');
      return;
    }

    const bookingData = {
      turfId, // Include turfId in the booking data
      selectedSlot,
      duration,
    };

    await handleSlotCheck(bookingData);
  }


    const handleSlotCheck = async (bookingData) => {
      const response = await fetch('http://localhost:8002/api/Turf/check-slot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          turfId,
          selectedSlot,
          duration, // Include duration here
        }),
      });
    
      const data = await response.json();
    
      if (data.isBooked) {
        // If the slot is already booked, display an error message
        setErrorMessage('The selected slot is already booked. Please choose another slot.');
        console.log('The selected slot is already booked. Please choose another slot.')
      } else {
        // If the slot is available, navigate to the payment page
        console.log('slot is vailable')
        navigate(`/payment/${turfId}`, { state: { totalAmount, bookingData } });
      }
    };
    

    // navigate(`/payment/${turfId}`, { state: { totalAmount ,bookingData} });

  









  return (
    <div className="book-turf-container">
      <h2>Book Turf</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Time Slot:</label>
          <select value={selectedSlot} onChange={handleSlotChange}>
            <option value="">--Select a Time Slot--</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot.startTime}>
                {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Duration (in hours):</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={handleDurationChange}
          />
        </div>

        <div className="form-group">
          <p><strong>Total Amount:</strong> ${totalAmount}</p>
        </div>

        <button type="submit" className="btn-submit">Proceed to Payment</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default BookTurf;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './Bookturf.css'

// const BookTurf = () => {
//   const { turfId } = useParams(); // Get turfId from URL
//   const navigate = useNavigate();
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState('');
//   const [duration, setDuration] = useState(1); // Default to 1 hour
//   const [totalAmount, setTotalAmount] = useState(100); // Default amount
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     console.log(turfId);
//     fetch(`http://localhost:8002/api/Turf/available-slots/${turfId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Available Slots:', data); // Log the data
//         setAvailableSlots(data); // Set available slots for the selected turf
//       })
//       .catch((error) => {
//         setErrorMessage('Error fetching available slots.');
//       });
//   }, [turfId]);

//   // Handle slot selection
//   const handleSlotChange = (e) => {
//     setSelectedSlot(e.target.value);
//   };

//   // Handle duration change and update total amount
//   const handleDurationChange = (e) => {
//     const newDuration = parseInt(e.target.value, 10);
//     setDuration(newDuration);
//     setTotalAmount(newDuration * 100); // Update amount based on duration
//   };

//   // Handle form submission for booking
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedSlot) {
//       setErrorMessage('Please select a time slot.');
//       return;
//     }

//     const bookingData = {
//       turfId, // Include turfId in the booking data
//       selectedSlot,
//       duration,
//     };

//     fetch('http://localhost:8002/api/Turf/book-slot', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(bookingData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           console.log(turfId);
//           setSuccessMessage('Slot booked successfully!');
//           setErrorMessage('');
//           navigate(`/payment/${turfId}`, { state: { totalAmount } });
//         } else {
//           setSuccessMessage('');
//           setErrorMessage(data.message);
//         }
//       })
//       .catch((error) => {
//         setErrorMessage('Error booking the slot. Please try again.');
//       });
//   };

//   return (
//     <div className="book-turf-container">
//       <h2>Book Turf</h2>
//       {successMessage && <p className="success-message">{successMessage}</p>}

//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Select Time Slot:</label>
//           <select value={selectedSlot} onChange={handleSlotChange}>
//             <option value="">--Select a Time Slot--</option>
//             {availableSlots.map((slot, index) => (
//               <option key={index} value={slot}>
//                 {slot}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Duration (in hours):</label>
//           <input
//             type="number"
//             min="1"
//             value={duration}
//             onChange={handleDurationChange}
//           />
//         </div>

//         <div className="form-group">
//           <p><strong>Total Amount:</strong> ${totalAmount}</p>
//         </div>

//         <button type="submit" className="btn-submit">Proceed to Payment</button>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </form>
//     </div>
//   );
// };

// export default BookTurf;



