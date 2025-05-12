import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 8;

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const response = await getStudents();
    setStudents(response.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      await deleteStudent(id);
      loadStudents();
    }
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filtered.slice(indexOfFirst, indexOfLast);

  return (
    <div className="container mt-4">
      <h2>Student List</h2>
      <Link to="/add" className="btn btn-primary mb-3">Add Student</Link>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or course"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>
                <Link to={`/edit/${student.id}`} className="btn btn-warning btn-sm mx-1">Edit</Link>
                <button onClick={() => handleDelete(student.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination total={filtered.length} perPage={studentsPerPage} setPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

const Pagination = ({ total, perPage, setPage, currentPage }) => {
  const pages = Math.ceil(total / perPage);
  return (
    <div className="mt-3">
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          className={`btn btn-sm ${currentPage === i + 1 ? 'btn-dark' : 'btn-light'} mx-1`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default StudentList;
