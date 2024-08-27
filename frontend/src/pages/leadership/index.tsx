import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const Leadership = () => {
    const [leadershipData, setLeadershipData] = useState(null);
    
    useEffect(() => {
        // # Fetch leadership data
        // Look at the fetch profile data function in frontend/src/pages/profile/index.tsx
        // Create a similar function to fetch leadership data
        // Use http://localhost:8000/user/points/get to fetch leadership data
        // Add token to the headers
        // Set the leadership data to the state using setLeadershipData
        // Call the function inside the useEffect hook
    }, []);

    return (
        <>
            <Navbar />
            <br />
            <br />
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white text-center mb-4">
                        Meet the Most Ambitious Students in Our Community
                    </h1>
                    <p className="text-lg text-white text-center">
                        Discover the top performers who are making a difference with their dedication and hard work.
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
               {/* 
               # Display leadership data here 
                    Map through the leadership data and display the user's name and points
                    If the leadership data is null, display a loading spinner
               */}
            </div>
        </>
    )
}

export default Leadership;
