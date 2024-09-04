import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useAuth";

const Submissions = () => {
    const router = useRouter();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useCurrentUser();
    const id = user.userId;

    useEffect(() => {
        const fetchSubmissions = async () => {
            const token = localStorage.getItem('access-token');
            try {
                const response = await fetch(`http://localhost:8000/submission/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch submissions. Please try again later.');
                }

                const data = await response.json();
                setSubmissions(data);
                setLoading(false);
            } catch (error: any) {
                console.error('Error fetching submissions:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [user]);

    if (loading) {
        return <p className="text-center text-lg text-gray-800">Loading submissions...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-800">{error}</p>;
    }

    return (
        <>
            <Navbar />
            <br />
            <div className="container mx-auto mt-16 py-12">
                <h1 className="text-4xl font-bold text-black text-center mb-4">
                    Submissions
                </h1>
                <div className="container mx-auto px-4 py-12">
                    {submissions.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {submissions.map((submission, index) => (
                                <div key={index} className="bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{submission.title || "Title"}</h2>
                                    <p className="text-gray-600 mt-2">Date submitted: {new Date(submission.submittedAt).toLocaleDateString()}</p>
                                    <button className="bg-black text-white font-semibold px-4 py-2 rounded-md mt-4 hover:bg-gray-700 transition" onClick={() => router.push(`/submissions/${submission._id}`)}>
                                        View Submission
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg text-gray-800">No submissions found</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Submissions;
