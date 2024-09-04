import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AssignmentPage = () => {
    const router = useRouter();
    const assignmentId = router.query.id as string;
    const [assignment, setAssignment] = useState([]);
    
    useEffect(() => {
        const fetchAssignment = async () => {
            const token = localStorage.getItem('access-token');
            try {
                const response = await fetch(`http://localhost:8000/assignment/${assignmentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch assignments. Please try again later.');
                }

                const data = await response.json();
                setAssignment(data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        }

        fetchAssignment();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access-token');
        if (!token) {
            console.error('No token found');
            return;
        }

        const submissionText = e.target.submission.value;
        try {
            const response = await fetch(`http://localhost:8000/assignment/submit/${assignmentId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ submissionText }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit assignment');
            }

            const data = await response.json();
            console.log('Assignment submitted successfully:', data);
            router.push('/assignments');
        } catch (error) {
            console.error('Error submitting assignment:', error);
        }
    }

    return (
        <>
            <Navbar />
            <br />
            <div className="container mx-auto mt-16 py-8">
                <h1 className="text-4xl font-bold text-black text-center p-4">
                    {assignment.title}
                </h1>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-100 shadow-lg rounded-lg p-6">
                    <p className="text-gray-600 mt-2 mb-4 font-bold">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Description</h2>
                    <p className="text-gray-600">{assignment.description}</p>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto p-4 shadow-md rounded my-8">
                    <h2 className="text-2xl font-bold mb-4">Submit Assignment</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Submission</label>
                        <textarea
                            name="submission"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-black text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-700 transition">
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default AssignmentPage;
