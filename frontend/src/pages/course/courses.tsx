// pages/courses.tsx

import { useEffect, useState } from 'react';

type Course = {
  id: number;
  name: string;
};

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/course/get');
        const data: Course[] = await response.json();
        console.log("All Courses Data: " + data);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {/* {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default Courses;
