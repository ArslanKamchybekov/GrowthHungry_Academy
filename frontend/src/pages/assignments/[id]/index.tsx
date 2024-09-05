import Navbar from "../../../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AssignmentPage = () => {
    const router = useRouter();
    const assignmentId = router.query.id as string;
    const [assignment, setAssignment] = useState<any>({});
    
    useEffect(() => {
        const fetchAssignment = async () => {
            const token = localStorage.getItem('access-token');
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assignment/${assignmentId}`, {
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem('access-token');
        if (!token) {
            console.error('No token found');
            return;
        }

        const submissionText = e.target.submission.value;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assignment/submit/${assignmentId}`, {
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
            router.push('/assignments');
        } catch (error) {
            console.error('Error submitting assignment:', error);
        }
    }

    return (
        <>
            <Navbar />
            <br />
            <form onSubmit={handleSubmit} className="container mx-auto max-w-md p-4 bg-gray-100 shadow-md rounded mt-16">
                <h2 className="text-2xl font-bold mb-4">Assignment: {assignment.title}</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Instructions</label>
                    <p className="text-gray-600 overflow-y-auto h-32 border rounded p-2">{assignment.description}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Submission</label>
                    <textarea
                        name="submission"
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                        rows={4}
                        placeholder="Enter your submission here"
                    />
                </div>

                <button type="submit" className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                    Submit
                </button>
            </form>
        </>
    )
}

export default AssignmentPage;
