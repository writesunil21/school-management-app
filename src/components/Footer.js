import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-orange-800 text-white text-center py-4 mt-8">
      <div className="max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} Utkramit High School, Basbitta. All rights reserved.</p>
      </div>
    </footer>
  );
}
