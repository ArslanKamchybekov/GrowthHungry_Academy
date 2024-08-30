// pages/courses.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

type Course = {
  id: number;
  name: string;
  description?: string; 
  prerequisites?: string;
};

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  const handleViewDetails = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("access-token");

        if (!token) {
          router.push("/signin");
          return;
        }

        const response = await fetch("http://localhost:8000/course/get", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data); // Set initial filtered courses to all courses
      } catch (error) {
        console.error("Error fetching courses:", error);
        router.push("/signin");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <form className="flex items-center mb-8" onSubmit={handleSearchSubmit}>
        <input
          className="w-full px-5 py-3 mr-3 shadow-md rounded-lg border border-gray-200"
          type="text"
          placeholder="What do you want to learn?"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-3 rounded-lg"
        >
          <Search size={16} />
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-blue-100 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {course.name}
              </h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-bold">Prerequisites:</span>{" "}
                {course.prerequisites}
              </p>
              <button
                onClick={() => handleViewDetails(course.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">
            No courses found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Courses;
