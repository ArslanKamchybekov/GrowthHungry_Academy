'use client'
import React from "react";
import { useState } from "react";
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Hero from '../components/Hero';

interface Props {
}

const Page: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('');

  return (
    <>
      <Heading title="GH Academy" description="GH Academy is a Learning Management platform for students to level-up their careers!"/>
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route}/> 
      <Hero />
    </> 
  );
};

export default Page;
