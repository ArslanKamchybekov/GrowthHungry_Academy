import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profileData, setProfileData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState(""); // State to manage user role

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) throw new Error("No token found");

        const response = await fetch(`http://localhost:8000/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();
        const courseIds = data.courses.map((course) => course._id);
        setProfileData(data);
        setUserRole(data.role); // Set the role of the user

        if (courseIds.length > 0) {
          // Fetch course names based on courseIds
          const coursesResponse = await fetchCourses(courseIds);
          setCourses(coursesResponse);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const fetchCourses = async (courseIds) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No token found");

      const coursePromises = courseIds.map(async (courseId) => {
        const response = await fetch(`http://localhost:8000/course/${courseId}`, {
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
        return { id: courseId, name: data.name }
      });

      const courseData = await Promise.all(coursePromises);
      return courseData;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`http://localhost:8000/course/delete/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEditCourse = (courseId) => {
    router.push(`/course/edit/${courseId}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-center my-8">My Profile</h1>
        {profileData ? (
          <div className="flex justify-center">
            <div className="bg-blue-100 shadow-md rounded-lg p-6 max-w-lg w-full">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">{profileData.name}</h2>
                <p className="text-sm text-gray-600">{profileData.email}</p>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <span className="text-gray-600 font-bold w-1/3">Role</span>
                  <span className="text-gray-800 font-medium">{profileData.role}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-bold w-1/3">Courses</span>
                    <div className="flex flex-col">
                    {courses.map((course) => (
                      <div key={course.id} className="flex items-center">
                        <span className="text-gray-800 font-medium">{course.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-bold w-1/3">Points</span>
                  <span className="text-gray-800 font-medium">{profileData.points}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-700"></div>
          </div>
        )}
      </div>

        {/* Admin Panel: list of all courses - edit, delete; create course; */}
        {userRole === "admin" && (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center my-8">Admin Panel</h1>
            <div className="flex justify-center">
              <div className="bg-blue-100 shadow-md rounded-lg p-6 max-w-lg w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Courses</h2>
                    <button
                        className="text-white bg-black hover:bg-gray-600 px-4 py-2 rounded"
                        onClick={() => router.push("/course/create")}
                    >
                        Create Course
                    </button>
                </div>
                <div className="mt-6 space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium">{course.name}</span>
                      <div className="flex space-x-4">
                        <button
                          className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
                          onClick={() => handleEditCourse(course.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default UserProfile;
