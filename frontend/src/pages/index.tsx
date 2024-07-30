// src/pages/index.tsx
import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <Sidebar />
    </>
  );
};

export default Home;
