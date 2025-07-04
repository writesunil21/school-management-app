import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-orange-600 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: School Name */}
        <div className="text-2xl font-bold">
          Utkramit High School, Basbitta
        </div>

        {/* Right: Navigation Links */}
        <nav className="space-x-4 text-lg">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/teachers" className="hover:underline">Teachers</Link>
          <Link to="/students" className="hover:underline">Students</Link>
        </nav>
      </div>
    </header>
  );
}
