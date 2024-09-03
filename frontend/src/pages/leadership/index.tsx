import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Leadership = () => {
    const [leadershipData, setLeadershipData] = useState(null);
    const router = useRouter();
    
    useEffect(() => {
        const fetchLeadership = async () => {
            try {
                const token = localStorage.getItem("access-token");
                if (!token) router.push("/signin");

                const response = await fetch(`http://localhost:8000/user/points/get`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    router.push("/signin");
                    throw new Error("Failed to fetch leadership data. Please try again later.");
                }

                const data = await response.json();
                setLeadershipData(data);
            } catch (error) {
                console.error("Error fetching leadership data:", error);
            }
        };

        fetchLeadership();
    }, []);

    return (
        <>
            <Navbar />
            <br />
            <br />
            <div className="bg-gradient-to-b from-blue-100 to-white text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-black text-center mb-4">
                        Meet the Most Ambitious Students in Our Community
                    </h1>
                    <p className="text-lg text-black text-center">
                        Discover the top performers who are making a difference with their dedication and hard work
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
            {leadershipData ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {leadershipData.map((user, index) => (
                            <div key={index} className="bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
                                <p className="text-gray-600">Points: <span className="font-semibold">{user.points}</span></p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Leadership;
