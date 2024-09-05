import Navbar from "../../../../components/Navbar";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const UpdateProfile = () => {

    const [profile, setProfile] = useState({
        name: "",
        // email: "",
        // password: "",
        // confirmPassword: "",
    });

    const router = useRouter();
    const { id } = useParams();

    const handleProfileChange = (e: any) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("access-token");
            if (!token) {
                throw new Error("No token found");
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profile),
            });

            if (response.ok) {
                alert("Profile updated successfully");
            } else {
                throw new Error("Profile update failed");
            }

            router.push(`/profile/${id}`);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
    
    return (
        <>
            <Navbar />
            <br />
            <form onSubmit={handleSubmit} className="container mx-auto max-w-md p-4 bg-gray-100 shadow-md rounded mt-16">
                <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

                {/* Your Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                
                {/* <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div> */}

{/*    
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

              
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={profile.confirmPassword}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div> */}

                <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                    Update Profile
                </button>
            </form>
        </>
    );
}

export default UpdateProfile;