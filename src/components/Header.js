import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    // h-16 = 64px
    <header className="h-16 bg-teal-600 text-white px-6 flex items-center z-20">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Left: School Name */}
        <div className="text-2xl font-bold leading-none">
          U.M.V Basbitta
        </div>

        {/* Right: Navigation Links */}
        <nav className="space-x-4 text-lg relative">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/teachers" className="hover:underline">Teachers</Link>
          <Link to="/students" className="hover:underline">Students</Link>

          {/* AI Dropdown */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="hover:underline relative ml-2"
            aria-expanded={showDropdown}
          >
            AI
          </button>

          {showDropdown && (
            <div
              className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg z-50"
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Link
                to="/audiorecorder"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Speech to Text
              </Link>
              <Link
                to="/ocrconverter"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                OCR
              </Link>
              <Link
                to="/faceregister"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Face Register
              </Link>
              <Link
                to="/faceattendance"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Face Attendance
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
