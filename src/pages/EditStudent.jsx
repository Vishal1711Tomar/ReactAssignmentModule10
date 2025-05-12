import React from 'react';
import { useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

const EditStudent = () => {
  const { id } = useParams();
  return (
    <div className="container mt-4">
      <h2>Edit Student</h2>
      <StudentForm studentId={id} />
    </div>
  );
};

export default EditStudent;
