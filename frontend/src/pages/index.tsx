// src/pages/index.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Courses from "./course/courses";
import Image from "next/image";
import Link from "next/link";

const Home: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    setIsSignedIn(!!token);
  }, []);

  return (
    <>
      <Navbar />
      <br />
      {isSignedIn ? (
        <section className="mt-16 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-4 text-black">GrowthHungry Courses</h2>
            <Courses />
          </div>
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-24">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-5xl font-bold mb-4">Welcome to GrowthHungry Academy</h1>
              <p className="text-xl mb-8">
                Unlock your potential with expert mentorship and high-quality education.
              </p>
              <Link href="/signup">
                <button className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition">
                  Get Started
                </button>
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-gray-800 py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-12 text-white">Why Choose Us?</h2>
              <div className="flex flex-wrap justify-center">
                <div className="w-full md:w-1/3 px-4 mb-8">
                  <div className="bg-gray-700 p-6 rounded-md shadow-md text-center">
                    <Image
                      src="/assets/icon_1.avif"
                      alt="Expert Mentorship"
                      width={80}
                      height={80}
                      className="mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-white">Expert Mentorship</h3>
                    <p className="text-gray-300">
                      Learn from industry experts who bring real-world experience to the classroom.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-8">
                  <div className="bg-gray-700 p-6 rounded-md shadow-md text-center">
                    <Image
                      src="/assets/icon_1.avif"
                      alt="High-Quality Content"
                      width={80}
                      height={80}
                      className="mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-white">High-Quality Content</h3>
                    <p className="text-gray-300">
                      Access top-notch educational materials tailored to your learning needs.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-8">
                  <div className="bg-gray-700 p-6 rounded-md shadow-md text-center">
                    <Image
                      src="/assets/icon_1.avif"
                      alt="Community Support"
                      width={80}
                      height={80}
                      className="mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-white">Community Support</h3>
                    <p className="text-gray-300">
                      Join a community of learners and collaborate with peers from around the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="bg-white text-black py-16">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Take Your Learning to the Next Level?</h2>
              <p className="text-xl mb-8">
                Sign up today and start your journey with GrowthHungry Academy!
              </p>
              <Link href="/signup">
                <button className="bg-black text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-600 transition">
                  Sign Up Now
                </button>
              </Link>
              <br />
              <br />
              <a href="https://wa.me/2243432210" target="_blank" rel="noopener noreferrer">
                <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition">
                  Contact Us on WhatsApp
                </button>
              </a>
            </div>
          </section>
        </>
      )}
      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 GrowthHungry Academy. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
