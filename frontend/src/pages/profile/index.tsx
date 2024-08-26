import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const UserProfile = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [username, setUsername] = useState("");
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('access-token');
                if (!token) throw new Error('No token found');

                const response = await fetch(`http://localhost:8000/user/profile/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const data = await response.json();
                console.log(data);
                setUsername(data.username);
                setProfileData(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>
                <div className="flex justify-center">
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
                        <div className="flex items-center space-x-4">
                            <img src="/path/to/profile-picture.jpg" alt="Profile Picture" className="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <h2 className="text-xl font-semibold">{username}</h2>
                                <p className="text-sm text-gray-600">{profileData?.email}</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center">
                                <span className="text-gray-600 w-1/3">First Name:</span>
                                <span className="text-gray-800 font-medium">{profileData?.first_name}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-600 w-1/3">Last Name:</span>
                                <span className="text-gray-800 font-medium">{profileData?.last_name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

export default UserProfile;
