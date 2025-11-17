import React from "react";
import schoolHome from "../assets/school-home.jpg";   // correct path

const Home = () => {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        backgroundImage: `url(${schoolHome})`,
        height: "calc(100vh - 64px - 64px)" // viewport minus header (64px) and footer (64px)
      }}
    >
      <div className="bg-black/50 p-6 rounded-xl text-center">
        <h1 className="text-4xl font-bold text-white mb-3">
          Welcome to the School Management System
        </h1>
        <p className="text-lg text-gray-200">
          Manage students, teachers, attendance, and more from one dashboard.
        </p>
      </div>
    </div>
  );
};

export default Home;
