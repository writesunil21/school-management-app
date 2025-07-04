import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TeacherList from './components/TeacherList';
import StudentList from './components/StudentList';

export default function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen p-6">
        <Routes>
          <Route path="/" element={<p className="text-center text-xl">Welcome to the School Management System</p>} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
