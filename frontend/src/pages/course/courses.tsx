// pages/courses.tsx
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Course = {
  id: number;
  name: string;
};

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  const handleViewDetails = (courseId) => {
    router.push(`/course`);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('access-token');
        const response = await fetch('http://localhost:8000/course/get', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-orange rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{course.name}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-bold">Prerequisites:</span> {course.prerequisites}
            </p>
            <button
              onClick={() => handleViewDetails(course.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
