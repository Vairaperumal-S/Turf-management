// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// const Payment = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [paymentDetails, setPaymentDetails] = useState({
//     amount: '',
//     cardNumber: '',
//     expirationDate: '',
//     cvv: '',
//   });
 

//   const location = useLocation();
//   const totalAmount = location.state?.totalAmount || 0;
  
//   const handleChange = (e) => {
//     setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:8001/api/payment/${id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(paymentDetails),
//       });
//       if (response.ok) {
//         navigate('/success'); // Redirect to success page after payment
//       } else {
//         console.error('Payment failed');
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//     }
//   };

//   return (
//     <div className="payment">
//       <h2>Payment Page</h2>
//       <form onSubmit={handlePayment}>
//         <label>Amount</label>
//         <input
//           type="number"
//           name="amount"
//           value={paymentDetails.amount}
//           onChange={handleChange}
//           required
//         />
//         <label>Card Number</label>
//         <input
//           type="text"
//           name="cardNumber"
//           value={paymentDetails.cardNumber}
//           onChange={handleChange}
//           required
//         />
//         <label>Expiration Date</label>
//         <input
//           type="text"
//           name="expirationDate"
//           placeholder="MM/YY"
//           value={paymentDetails.expirationDate}
//           onChange={handleChange}
//           required
//         />
//         <label>CVV</label>
//         <input
//           type="password"
//           name="cvv"
//           value={paymentDetails.cvv}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Pay Now</button>
//       </form>
//     </div>
//   );
// };

// export default Payment;











import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './Payment.css'

const Payment = () => {
  const { id } = useParams(); // Get turfId from the URL
  console.log(id);
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  const bookingData = location.state?.bookingData;

  const [paymentDetails, setPaymentDetails] = useState({
    amount: totalAmount, // Set the initial amount from totalAmount
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    turfId: id, // Include turfId in payment details
  });

  useEffect(() => {
    // Update the amount if totalAmount changes
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      amount: totalAmount,
      turfId: id,
    }));
  }, [totalAmount, id]);

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };



  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8001/api/payment/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
        // credentials: 'include' // Send paymentDetails, including turfId
      });
      if (response.ok) {
        const bookingResponse = await fetch('http://localhost:8002/api/Turf/book-slot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            turfId: bookingData.turfId,
            selectedSlot: bookingData.selectedSlot,
            duration: bookingData.duration,
          }),
        });

        const data = await bookingResponse.json();

        if (data.success) {
          console.log('Slot booked successfully!');
          // Navigate to a success page after booking
          navigate('/success');
        } else {
          console.error('Error booking slot:', data.message);
        }
      } else {
        console.error('Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="payment">
      <h2>Payment Page</h2>
      <form onSubmit={handlePayment}>
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={paymentDetails.amount}
          readOnly // Make this field read-only
          required
        />
        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          required
        />
        <label>Expiration Date</label>
        <input
          type="text"
          name="expirationDate"
          placeholder="MM/YY"
          value={paymentDetails.expirationDate}
          onChange={handleChange}
          required
        />
        <label>CVV</label>
        <input
          type="password"
          name="cvv"
          value={paymentDetails.cvv}
          onChange={handleChange}
          required
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;

