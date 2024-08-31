"use client";
import React, { useState, useEffect, use } from "react";
import Navbar from "@/components/Navbar";
import { BookOpen, Menu, X } from "lucide-react";
import styles from "../course.module.css";
import { useRouter, useParams } from "next/navigation";
import useCurrentUser from "@/hooks/useAuth";

const Course = () => {
  const router = useRouter();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useCurrentUser();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("access-token");

        if (!token) {
          router.push("/signin");
          return;
        }

        const response = await fetch(`http://localhost:8000/course/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }

        const data = await response.json();
        setCourse(data);
      } catch (error: any) {
        console.error("Error fetching course:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id, router]);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("access-token");
      
      if (!token) {
        router.push("/signin");
        return;
      }

      const response = await fetch(`http://localhost:8000/user/enroll/${user?.userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to enroll in course");
      }

      router.push(`/course/progress/${id}`);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenroll = async () => {
    // Aleks & Aida: Implement unenroll functionality here
    // Hint: You can use the same endpoint as the enroll functionality
    // Test the functionality by first enrolling in a course and then unenrolling and checking if the course is removed from the user's profile
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="bg-white border-b md:hidden">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">{course?.name || "Course Name"}</h1>
          <button
            className="text-gray-800 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={20} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="flex flex-col px-4 pb-4 space-y-2">
            <a href="/" className="text-gray-800 hover:text-gray-600">
              Home
            </a>
            <a href="/leadership" className="text-gray-800 hover:text-gray-600">
              Leadership
            </a>
          </div>
        )}
      </nav>

      {/* Main Navbar for larger screens */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Page Wrapper */}
      <div className={`p-2 md:p-8 ${styles.pageWrapper}`}>
        <main className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
            {/* Course Content */}
            <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
              <div className="border rounded-md overflow-hidden bg-white">
                <div className={styles.videoContainer}>
                  <iframe
                    src="https://www.youtube.com/embed/kf6yyxMck8Y?si=rXhTTDQuhuiB3ZrU"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className={styles.videoIframe}
                  ></iframe>
                </div>
              </div>
              <div className="border rounded-md p-6 bg-white">
                <div className="flex items-center gap-x-2 mb-3">
                  <div className="inline-flex items-center border rounded-md px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-sky-500/10 text-sky-800">
                    <BookOpen className="mr-1" />
                    <span>{course?.courseData.length || 0} Chapters</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg md:text-2xl mb-2 capitalize">
                  {course?.name || "Course Name"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {course?.description || "Course description goes here."}
                </p>
              </div>
            </div>

            <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
              <div className="border rounded-md p-6 text-secondary bg-white">
                <div>
                  <h4 className="font-semibold text-xl mb-4">Ready to learn?</h4>
                  <p className="text-gray-700">
                    Start your learning journey and track your progress through the course.
                  </p>
                </div>
                <button
                  type="button"
                  className="my-4 inline-flex items-center justify-center text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full border border-solid border-black"
                  onClick={handleEnroll}
                >
                  Start course
                </button>
                <button
                    type="button"
                    className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full border border-solid border-red-500 text-red-500"
                    onClick={handleUnenroll}
                  >
                    Unenroll
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Course;
