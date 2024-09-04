import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profileData, setProfileData] = useState<any>();
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("access-token");
        if (!token){
            router.push("/signin");
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();
        const courseIds = data.courses.map((course: any) => course._id);
        setProfileData(data);
        setUserRole(data.role);

        if (courseIds.length > 0) {
          const coursesResponse = await fetchCourses(courseIds);
          setCourses(coursesResponse as any);
        }
        fetchAssignments();
        fetchUsers();
      } catch (error) {
        console.error("Error fetching user profile:", error);
        router.push("/");
      }
    };

    fetchUserProfile();
  }, [id]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const fetchCourses = async (courseIds: any) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No token found");

      const coursePromises = courseIds.map(async (courseId: any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/${courseId}`, {
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

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assignment/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch assignments");
      }

      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  }

  const handleDeleteUser = async (userId: any) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prevUsers) => prevUsers.filter((user: any) => user.id !== userId));
      router.push("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  const handleDeleteCourse = async (courseId: any) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/delete/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      const unenrollResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/unenroll/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: courseId }),
      });

        if (!unenrollResponse.ok) {
            throw new Error("Failed to unenroll user from course");
        }
      setCourses((prevCourses) => prevCourses.filter((course: any) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handlePromoteUser = async (userId: any) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/promote/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to promote user");
      }

      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) => {
          if (user._id === userId) {
            return { ...user, role: "admin" };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Error promoting user:", error);
    }
  };

  const handleDemoteUser = async (userId: any) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/demote/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to demote user");
      }

      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) => {
          if (user._id === userId) {
            return { ...user, role: "user" };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Error demoting user:", error);
    }
  };

  const handleDeleteAssignment = async (assignmentId: any) => {
    try {
      const token = localStorage.getItem("access-token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assignment/${assignmentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete assignment");
      }

      setAssignments((prevAssignments) =>
        prevAssignments.filter((assignment: any) => assignment._id !== assignmentId)
      );
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  }

  return (
    <>
      <Navbar />
      <br />
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold text-black text-center my-4">My Profile</h1>
        {profileData ? (
          <div className="flex justify-center">
            <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-lg w-full my-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">{profileData.name}</h2>
                  <p className="text-sm text-gray-600">{profileData.email}</p>
                </div>
                <button
                  className="text-white bg-black hover:bg-gray-700 px-4 py-2 rounded font-bold"
                  onClick={() => router.push(`/profile/update/${id}`)}
                >
                  Update
                </button>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <span className="text-gray-600 font-bold w-1/3">Role</span>
                  <span className="text-gray-800 font-medium">{profileData.role}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-bold w-1/3">Courses</span>
                    <div className="flex flex-col">
                    {courses.map((course: any) => (
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
            <h1 className="text-3xl font-bold text-center my-4">Admin Panel</h1>
            <div className="flex justify-center">
              <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-lg w-full my-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Courses</h2>
                    <button
                        className="text-white bg-black hover:bg-gray-700 px-4 py-2 rounded font-bold"
                        onClick={() => router.push("/course/create")}
                    >
                        Create
                    </button>
                </div>
                <div className="mt-6 space-y-4">
                  {courses.map((course: any) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium">{course.name}</span>
                      <div className="flex space-x-4">
                        <button
                          className="text-white bg-gray-400 hover:bg-gray-700 px-4 py-2 rounded font-bold"
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
              
            {/* Admin Panel: list of all users - promote, demote, delete */}
            <div className="flex justify-center my-8">
              <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-lg w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Users</h2>
                </div>
                <div className="mt-6 space-y-4">
                  {users.map((user: any) => (
                    <div key={user.id} className="flex items-center justify-between space-x-4">
                      {user.role === "admin" ? (
                        <span className="text-gray-800 font-bold">{user.name} (admin)</span>
                      ) : (
                        <span className="text-gray-800">{user.name}</span>
                      )}
                      <div className="flex space-x-4">
                        {user.role === "user" && (
                          <>
                            <button
                              className="text-white bg-gray-400 hover:bg-gray-700 px-4 py-2 rounded font-bold"
                              onClick={() => handlePromoteUser(user._id)}
                            >
                              Promote
                            </button>
                            <button
                              className="text-white bg-gray-400 hover:bg-gray-700 px-4 py-2 rounded font-bold"
                              onClick={() => handleDeleteUser(user._id)}
                              >
                              Delete
                            </button>
                          </>
                        )}
                        {user.role === "admin" && (
                          <button
                            className="text-white bg-gray-400 hover:bg-gray-700 px-4 py-2 rounded font-bold"
                            onClick={() => handleDemoteUser(user._id)}
                          >
                            Demote
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Admin Panel: list of all assignments - edit, delete; create assignment; */}
            <div className="flex justify-center">
              <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-lg w-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Assignments</h2>
                  <button
                    className="text-white bg-black hover:bg-gray-700 px-4 py-2 rounded font-bold"
                    onClick={() => router.push("/assignments/create")}
                  >
                    Create
                  </button>
                </div>
                <div className="mt-6 space-y-4">
                  {assignments.map((assignment: any) => (
                    <div key={assignment._id} className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium">{assignment.title}</span>
                      <div className="flex space-x-4">
                        <button
                          className="text-white bg-gray-400 hover:bg-gray-700 px-4 py-2 rounded font-bold"
                          onClick={() => router.push(`/assignments/update/${assignment._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-white bg-gray-400 hover:bg-gray-700 px-4 py-2 rounded font-bold"
                          onClick={() => handleDeleteAssignment(assignment._id)}
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
