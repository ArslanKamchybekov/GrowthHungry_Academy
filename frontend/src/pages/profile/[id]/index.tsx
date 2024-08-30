import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const UserProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [profileData, setProfileData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("access-token");
                if (!token) throw new Error("No token found");

                const response = await fetch(`http://localhost:8000/user/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("User not found");
                }

                const data = await response.json();
                const courseIds = data.courses.map(course => course._id);
                setProfileData(data);

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

            // Fetch course names for each course ID
            const coursePromises = courseIds.map(async (courseId) => {
                const response = await fetch(`http://localhost:8000/course/${courseId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch course");
                }

                const data = await response.json();
                return data.name;
            });

            const courseNames = await Promise.all(coursePromises);
            return courseNames;
        } catch (error) {
            console.error("Error fetching courses:", error);
            return [];
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 mt-16">
                <h1 className="text-3xl font-bold text-center mb-4">My Profile</h1>
                {profileData ? (
                    <div className="flex justify-center">
                        <div className="bg-blue-100 shadow-md rounded-lg p-6 max-w-lg w-full">
                            <div className="mb-4">
                                <h2 className="text-2xl font-semibold">{profileData.name}</h2>
                                <p className="text-sm text-gray-600">{profileData.email}</p>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center">
                                    <span className="text-gray-600 w-1/3">Role</span>
                                    <span className="text-gray-800 font-medium">{profileData.role}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600 w-1/3">Courses</span>
                                    <span className="text-gray-800 font-medium">
                                        {courses.length > 0 ? courses.map(
                                            (course, index) => (
                                                   <div key={index}>{course}</div> 
                                                )
                                            ) : "No courses enrolled"
                                        }
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600 w-1/3">Points</span>
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
        </>
    );
};

export default UserProfile;
