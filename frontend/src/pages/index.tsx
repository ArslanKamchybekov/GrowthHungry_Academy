// src/pages/index.tsx
import React, { useState } from "react";
import Navbar from '../components/Navbar';
import { Search } from "lucide-react";
import Courses from "./course/courses";

const Home: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    console.log(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="bg-gray-100">
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-4xl font-bold my-2 text-gray-800">Welcome to GH Academy</h2>
                <h3 className="text-2xl text-gray-600">Level up your career with our Computer Science program</h3>
            </div>
      </div>
      <Courses/>
    </>
  );
};

export default Home;
