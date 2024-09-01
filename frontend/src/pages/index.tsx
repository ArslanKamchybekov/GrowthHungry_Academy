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
                      src="/assets/icon_3.png"
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
                      src="/assets/icon_2.png"
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
              <a href="https://wa.me/2243432210" target="_blank" rel="noopener noreferrer">
                <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition mx-4">
                  Contact Us on WhatsApp
                </button>
              </a>
              <Link href="https://www.growthhungry.life/">
                <button className="bg-black text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-600 transition">
                  Our Website
                </button>
              </Link>
            </div>
          </section>
        </>
      )}
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          {/* Footer top section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Company info and logo */}
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">GrowthHungry Academy</h3>
              <p className="text-gray-400">Empowering your growth with quality education and mentorship.</p>
            </div>

            {/* Footer navigation links */}
            <div className="flex justify-center md:justify-start space-x-4">
              {/* <Link href="/about">
                <h1 className="text-gray-300 hover:text-white">About Us</h1>
              </Link>
              <Link href="/courses">
                <h1 className="text-gray-300 hover:text-white">Courses</h1>
              </Link>
              <Link href="/contact">
                <h1 className="text-gray-300 hover:text-white">Contact</h1>
              </Link>
              <Link href="/faq">
                <h1 className="text-gray-300 hover:text-white">FAQ</h1>
              </Link> */}
            </div>
          </div>

          {/* Social media links section */}
          <div className="flex justify-center mt-8">
            <a href="https://www.instagram.com/growthhungry/" target="_blank" rel="noopener noreferrer" className="mx-2">
              <Image src="/assets/instagram.png" alt="Instagram" width={24} height={24} className="opacity-70 hover:opacity-100 transition" />
            </a>
            <a href="https://www.linkedin.com/company/growthhungry-academy/mycompany/" target="_blank" rel="noopener noreferrer" className="mx-2">
              <Image src="/assets/linkedin.png" alt="LinkedIn" width={24} height={24} className="opacity-70 hover:opacity-100 transition" />
            </a>
            <a href="https://t.me/growthhungrypublic" target="_blank" rel="noopener noreferrer" className="mx-2">
              <Image src="/assets/telegram.png" alt="Telegram" width={24} height={24} className="opacity-70 hover:opacity-100 transition" />
            </a>
          </div>

          {/* Footer bottom section */}
          <div className="mt-8 border-t border-gray-700 pt-4">
            <p className="text-center text-gray-400">&copy; 2024 GrowthHungry Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
