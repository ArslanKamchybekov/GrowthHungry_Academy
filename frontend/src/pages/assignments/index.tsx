import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Assignments = () => {
    const router = useRouter();
    const [assignments, setAssignments] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (!token) router.push('/signin');

        const fetchAssignments = async () => {
            try {
                const response = await fetch('http://localhost:8000/assignment/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch assignments. Please try again later.');
                }

                const data = await response.json();
                setAssignments(data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        }

        fetchAssignments();
    }, []);

    if(assignments.length === 0) {
        return (
            <>
                <Navbar />
                <br />
                <div className="container mx-auto mt-16 py-12">
                    <h1 className="text-4xl font-bold text-black text-center mb-4">
                        Assignments
                    </h1>
                </div>
                <div className="container mx-auto px-4 py-12">
                    <p className="text-center text-xl">No assignments found</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <br />
            <div className="container mx-auto mt-16 py-12">
                <h1 className="text-4xl font-bold text-black text-center mb-4">
                    Assignments
                </h1>
            </div>
            <div className="container mx-auto px-4 py-12">
                {assignments.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {assignments.map((assignment, index) => (
                            <div key={index} className="bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{assignment.title}</h2>
                                <p className="text-gray-600 max-h-24 overflow-y-auto">{assignment.description}</p>
                                <p className="text-gray-600 mt-2">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                                <button className="bg-black text-white font-semibold px-4 py-2 rounded-md mt-4 hover:bg-gray-700 transition" onClick={() => router.push(`/assignments/${assignment._id}`)}>
                                    View Assignment
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center mt-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-700"></div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Assignments;
