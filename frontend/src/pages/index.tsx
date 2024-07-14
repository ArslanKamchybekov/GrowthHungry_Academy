// src/pages/index.tsx
import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
};

export default Home;
