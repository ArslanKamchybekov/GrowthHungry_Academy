// pages/courses.tsx
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

type Course = {
  _id: string;
  name: string;
  description?: string;
  prerequisites?: string;
};

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  const handleViewDetails = (courseId: string) => {
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/get`, {
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
        setFilteredCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [router]);

  return (
    <div className="container mx-auto px-2 py-8">
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
          className="bg-blue-900 text-white px-5 py-3 rounded-lg"
        >
          <Search size={16} />
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-gray-100 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
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
                onClick={() => handleViewDetails(course._id)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 font-bold"
              >
                View Course
              </button>
            </div>
          ))
        ) : (
          <div className="text-center font-semibold text-gray-600">
            No courses found. Please try a different search term.
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
