import React from 'react';
import './admin.css'
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleAddTurf = () => {
    navigate('/Turf'); // Link to Add Turf page
  };

  const handleDeleteTurf = () => {
    navigate('/deleteturf'); // Link to Delete Turf page
  };

  const handleModifyTurf = () => {
    navigate('/show'); // Link to Modify Turf page
  };
  const showreview = () => {
    navigate('/showreview'); 
  };


  const frequentusers = () => {
    navigate('/freq'); 
  };

  

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <div className="button-container">
        <button onClick={handleAddTurf} className="btn btn-primary">
          Add Turf
        </button>
        <button onClick={handleDeleteTurf} className="btn btn-danger">
          Delete Turf
        </button>
        <button onClick={handleModifyTurf} className="btn btn-warning">
          Modify Turf
        </button>

        <button onClick={showreview} className="btn btn-warning">
          show reviews
        </button>



        <button onClick={frequentusers} className="btn btn-warning">
          Frequent users
        </button>

      </div>
    </div>
  );
};

export default AdminPage;
