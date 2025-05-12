import axios from 'axios';

const API_URL = 'http://localhost:5000/students'; 

export const getStudents = () => axios.get(API_URL);
export const getStudentById = (id) => axios.get(`${API_URL}/${id}`);
export const addStudent = (data) => axios.post(API_URL, data);
export const updateStudent = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API_URL}/${id}`);
