import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
};

export default HomePage;