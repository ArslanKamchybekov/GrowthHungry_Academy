import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SubmissionPage = () => {
    const router = useRouter();
    const submissionId = router.query.id as string;
    const [submission, setSubmission] = useState([]);
    
    useEffect(() => {
        const fetchSubmission = async () => {
            const token = localStorage.getItem('access-token');
            try {
                const response = await fetch(`http://localhost:8000/submission/${submissionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch submission. Please try again later.');
                }

                const data = await response.json();
                setSubmission(data);
            } catch (error) {
                console.error('Error fetching submission:', error);
            }
        }
        fetchSubmission();
    }, []);

    return (
        <>
            <Navbar />
            <br />
            <div className="container mx-auto mt-16 py-12">
                <h1 className="text-4xl font-bold text-black text-center mb-4">
                    Submission
                </h1>
                <div className="container mx-auto px-4 py-12">
                    <div className="bg-gray-100 shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{submission.title}</h2>
                        <p className="text-gray-600">{submission.description}</p>
                        <p className="text-gray-600 mt-2">Date submitted: {new Date(submission.submittedAt).toLocaleDateString()}</p>
                        <p className="text-gray-600 mt-2">Submission: {submission.submissionText}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubmissionPage;
