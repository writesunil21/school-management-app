import React from 'react';

export default function Footer() {
  return (
    // h-16 = 64px
    <footer className="h-16 bg-teal-800 text-white flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full px-4 text-sm text-center">
        &copy; {new Date().getFullYear()} U.M.V, Basbitta. All rights reserved.
      </div>
    </footer>
  );
}
