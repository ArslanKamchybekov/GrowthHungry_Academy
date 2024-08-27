import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const UserProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {

        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("access-token")

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
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>
                {profileData ? (
                    <div className="flex justify-center">
                        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
                            <div className="mb-4">
                                <h2 className="text-2xl font-semibold">{profileData.name}</h2>
                                <p className="text-sm text-gray-600">{profileData.email}</p>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center">
                                    <span className="text-gray-600 w-1/3">Role:</span>
                                    <span className="text-gray-800 font-medium">{profileData.role}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600 w-1/3">Courses:</span>
                                    <span className="text-gray-800 font-medium">
                                        {profileData.courses.name > 0 ? profileData.courses.join(", ") : "No courses enrolled"}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600 w-1/3">Points:</span>
                                    <span className="text-gray-800 font-medium">{profileData.points}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">Loading user profile...</p>
                )}
            </div>
        </>
    );
};

export default UserProfile;
