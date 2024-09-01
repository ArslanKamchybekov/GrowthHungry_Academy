"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { BookOpen, Link, Menu, X } from "lucide-react";
import styles from "../course.module.css";
import { useRouter, useParams } from "next/navigation";
import useCurrentUser from "@/hooks/useAuth";

const Course = () => {
  const router = useRouter();
  const { id } = useParams();
  const { user } = useCurrentUser();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

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
        
        const userResponse = await fetch(`http://localhost:8000/user/${user?.userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const enrolledCourses = userData.courses || [];
          setIsEnrolled(enrolledCourses.some(course => course._id === id));
        }

      } catch (error: any) {
        console.error("Error fetching course:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id, router, user]);

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

      setIsEnrolled(true);
      router.push(`/course/progress/${id}`);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenroll = async () => {
    // Aleks & Aida: Implement unenroll functionality here
    // Hint: You can use the same endpoint as the enroll functionality
    // Test the functionality by first enrolling in a course and then unenrolling and checking if the course is removed from the user's profile
  };

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
              <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-slate-100 shadow-lg p-4">
                <img
                  src={course?.thumbnail.url || "/assets/placeholder.webp"}
                  alt="Course Thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="border rounded-md p-6 bg-white">
                <div className="flex items-center gap-x-2 mb-3">
                  <div className="inline-flex items-center border rounded-md px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-sky-500/10 text-sky-800">
                    <BookOpen className="mr-2" />
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
                {isEnrolled ? (
                  // Add a button to unenroll from the course, continue the course
                  <div className="flex flex-col items-center justify-between">
                    <button
                      type="button"
                      className="my-2 inline-flex items-center justify-center text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full border border-solid border-black"
                      onClick={() => router.push(`/course/progress/${id}`)}
                    >
                      Continue course
                    </button>
                    <button
                      type="button"
                      className="my-2 inline-flex items-center justify-center text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full border border-solid border-red-500 text-red-500"
                      onClick={handleUnenroll}
                    >
                      Unenroll
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="my-4 inline-flex items-center justify-center text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full border border-solid border-black"
                    onClick={handleEnroll}
                  >
                    Start course
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Course;
