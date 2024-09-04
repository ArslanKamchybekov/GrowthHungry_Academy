import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useAuth";

const Submissions = () => {
    const router = useRouter();
    const [submissions, setSubmissions] = useState([]);
    const { user } = useCurrentUser();
    const { id } = router.query;

    useEffect(() => {
        const fetchSubmissions = async () => {
            const token = localStorage.getItem('access-token');
            if (!token) {
                router.push('/signin');
                return;
            }
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
            } catch (error: any) {
                console.error('Error fetching submissions:', error);
                router.push("/");
            }
        };

        fetchSubmissions();
    }, [user]);

    if(submissions.length === 0) {
        return (
            <>
                <Navbar />
                <br />
                <div className="container mx-auto mt-16 py-12">
                    <h1 className="text-4xl font-bold text-black text-center mb-4">
                        Submissions
                    </h1>
                </div>
                <div className="container mx-auto px-4 py-12">
                    <p className="text-center text-xl">No submissions found</p>
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
                    Submissions
                </h1>
            </div>
            <div className="container mx-auto px-4 py-12">
                {submissions ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {submissions.map((submission: any, index) => (
                            <div key={index} className="bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <p className="font-bold my-2">Date submitted: {new Date(submission.submittedAt).toLocaleDateString()}</p>
                                <p className="text-gray-600 max-h-24 overflow-y-auto">{submission.submissionText}</p>
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
    );
};

export default Submissions;
