import axios from "axios";

// const API_BASE_URL = "http://localhost:8080/api/students";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface Student {
  id?: number;
  name: string;
  email: string;
  age: number;
}

export const getAllStudents = () => {
  return axios.get<Student[]>(API_BASE_URL);
};

export const createStudent = (student: Student) => {
  return axios.post<Student>(API_BASE_URL, student);
};

export const deleteStudent = (id: number) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export const updateStudent = (id: number, student: Student) => {
  return axios.put<Student>(`${API_BASE_URL}/${id}`, student);
};
