import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const Leadership = () => {
    const [leadershipData, setLeadershipData] = useState(null);
    
    useEffect(() => {
        // Fetch leadership data
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
               {/* Display leadership data here */}
            </div>
        </>
    )
}

export default Leadership;
