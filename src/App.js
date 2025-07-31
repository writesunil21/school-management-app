import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TeacherList from './components/TeacherList';
import StudentList from './components/StudentList';
import AudioRecorder from './components/AudioRecorder';
import OcrConverter from './components/OcrConverter';

export default function App() {
  return (
    <Router>
      {/* Full-height layout container */}
      <div className="flex flex-col min-h-screen">
        <Header />

        {/* Main content that grows and scrolls if needed */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<p className="text-center text-xl">Welcome to the School Management System</p>} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/audiorecorder" element={<AudioRecorder />} />
            <Route path="/ocrconverter" element={<OcrConverter />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
