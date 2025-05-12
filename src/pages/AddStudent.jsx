import React from 'react';
import StudentForm from '../components/StudentForm';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h2>Add Student</h2>
      <StudentForm />
      <button onClick={handleBack} className="btn btn-secondary mt-3">
        ← Back to List
      </button>
    </div>
  );
};

export default AddStudent;
