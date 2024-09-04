import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useState } from 'react';

const UpdateAssignmentForm = () => {
    const router = useRouter();
    const { id } = router.query;
    const [assignment, setAssignment] = useState({
        title: "",
        description: "",
        dueDate: "",
    });
    
    const handleAssignmentChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAssignment({ ...assignment, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access-token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/assignment/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assignment),
            });

            if (!response.ok) {
                throw new Error('Failed to update assignment');
            }
            router.push('/assignments');
        } catch (error) {
            console.error('Error updating assignment:', error);
        }
    }
    
    return (
        <>
            <Navbar />
            <br />
            <form onSubmit={handleSubmit} className="container mx-auto max-w-md p-4 bg-gray-100 shadow-md rounded mt-16">
                <h2 className="text-2xl font-bold mb-4">Update Assignment</h2>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={assignment.title}
                        onChange={handleAssignmentChange}
                        className="w-full p-2 border border-gray-400 rounded"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={assignment.description}
                        onChange={handleAssignmentChange}
                        className="w-full p-2 border border-gray-400 rounded"
                    />
                </div>

                {/* Due Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={assignment.dueDate}
                        onChange={handleAssignmentChange}
                        className="w-full p-2 border border-gray-400 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-700 text-white font-semibold p-2 rounded transition"
                >
                    Update Assignment
                </button>
            </form>
        </>
    );
}

export default UpdateAssignmentForm;