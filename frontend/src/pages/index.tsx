// src/pages/index.tsx
import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Courses from "./course/courses";

const Home: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    console.log(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Implement search functionality here
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="bg-gray-100">
            <div className="container mx-auto px-6 py-16">
                <h2 className="text-4xl font-bold my-2 text-gray-800">Welcome to GH Academy</h2>
                <h3 className="text-2xl mb-8 text-gray-600">Learn the latest technologies with our hands-on courses</h3>
                <div className="flex items-center">
                    <input className="w-full px-5 py-3 mr-3 shadow-md rounded-lg" type="text" placeholder="What do you want to learn?"/>
                    <button className="bg-blue-500 text-white px-5 py-3 rounded-lg">Search</button>
                </div>
            </div>
        </div>
        <Courses />
    </>
  );
};

export default Home;
