import React, { useEffect, useState } from 'react';
import { addStudent, getStudentById, updateStudent } from '../api';
import { useNavigate } from 'react-router-dom';

const StudentForm = ({ studentId }) => {
  const [student, setStudent] = useState({ name: '', email: '', course: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      loadStudent();
    }
  }, [studentId]);

  const loadStudent = async () => {
    const res = await getStudentById(studentId);
    setStudent(res.data);
  };

  const validate = () => {
    const errs = {};
    if (!student.name) errs.name = 'Name is required';
    if (!student.email) errs.email = 'Email is required';
    if (!student.course) errs.course = 'Course is required';
    return errs;
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (studentId) {
        await updateStudent(studentId, student);
      } else {
        await addStudent(student);
      }
      navigate('/students');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={student.name}
          onChange={handleChange}
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={student.email}
          onChange={handleChange}
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
      </div>
      <div className="mb-3">
        <label>Course</label>
        <input
          type="text"
          className="form-control"
          name="course"
          value={student.course}
          onChange={handleChange}
        />
        {errors.course && <div className="text-danger">{errors.course}</div>}
      </div>
      <button type="submit" className="btn btn-success">{studentId ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default StudentForm;
