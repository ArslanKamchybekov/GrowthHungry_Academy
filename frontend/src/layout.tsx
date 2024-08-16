'use client'
import React, { useEffect, useState } from 'react';
import ReduxProvider from "./components/ReduxProvider";
import "./styles/globals.css";
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CourseProgressSidebar from './components/CourseProgressSidebar';
import { Course } from './pages/types/types';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  // const showSidebar = pathname.includes('/course/progress');
  // const [id, setId] = useState<string | null>(null);
  // const [title, setTitle] = useState("")
  // const [links, setLinks] = useState<Course[]>([]);

  // useEffect(() => {
  //   const pathParts = pathname.split('/');
  //   // Check if the URL is in the format /course/progress/[id]
  //   if (pathParts[1] === 'course' && pathParts[2] === 'progress' && pathParts[3]) {
  //     setId(pathParts[3]); // Set the id from the URL
  //   } else {
  //     setId(null); // Reset if not on a course progress page
  //   }
  // }, [pathname])

  // useEffect(() => {
  //   if (id) {
  //     const fetchCourse = async () => {
  //         try {
  //             const token = localStorage.getItem('access-token');
  //             if (!token) throw new Error('No token found');

  //             const response = await fetch(`http://localhost:8000/course/content/${id}`, {
  //                 headers: {
  //                     'Authorization': `Bearer ${token}`,
  //                     'Content-Type': 'application/json'
  //                 }
  //             });
  //             if (!response.ok) {
  //                 throw new Error('Course not found');
  //             }
  //             const data = await response.json();
  //             console.log(data)
  //             setTitle(data.name)
  //             setLinks(data.courseData)
  //         } catch (error) {
  //             console.error('Error fetching course:', error);
  //         }
  //     }

  //     fetchCourse()
  //   }
  // }, [id]);

  return (


    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          {/* <Navbar />
          <div className="layout">
            {showSidebar && <CourseProgressSidebar titleCourse={title} links={links} />}
            <main>{children}</main>
          </div> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
