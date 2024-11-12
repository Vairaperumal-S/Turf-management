import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Turf from './Components/Addturf';
import Delete from './Components/Deleteturf';
import Showturf from './Components/showturf';
import BookTurf from './Components/Bookturf';
import Admin from './pages/admin';
import Payment from './Components/Payment';
import Modify from './Components/Modify';
import Show from './Components/Show';
import Review from './Components/Review';
import ShowReview from './Components/showreview';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Turf" element={<Turf />} />
        <Route path="/showturf" element={<Showturf />} />
        <Route path="/bookturf/:turfId" element={<BookTurf />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/modify/:turfId" element={<Modify />} />
        <Route path="/show" element={<Show />} />
        <Route path="/review" element={<Review />} />
        <Route path="/showreview" element={<ShowReview />} />
        <Route path="/deleteturf" element={<Delete />} />
      </Routes>
    </div>
  );
}

export default App;
