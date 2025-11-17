import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TeacherList from './components/TeacherList';
import StudentList from './components/StudentList';
import AudioRecorder from './components/AudioRecorder';
import OcrConverter from './components/OcrConverter';
import FaceRegister from './components/FaceRegister';
import FaceAttendance from './components/FaceAttendance';
import Home from "./components/Home";


/* wrapper to use useLocation hook */
function AppWrapper() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* main toggles overflow depending on route */}
      <main className={`flex-1 ${isHome ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/audiorecorder" element={<AudioRecorder />} />
          <Route path="/ocrconverter" element={<OcrConverter />} />
          <Route path="/faceregister" element={<FaceRegister />} />
          <Route path="/faceattendance" element={<FaceAttendance />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
