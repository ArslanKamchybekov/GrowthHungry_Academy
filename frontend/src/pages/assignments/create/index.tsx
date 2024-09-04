// components/CreateCourseForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface IAssignment {
    title: string;
    description: string;
    dueDate: string;
}

const CreateAssignmentForm: React.FC = () => {
  const router = useRouter();  
  const [assignment, setAssignment] = useState<IAssignment>({
    title: "",
    description: "",
    dueDate: "",
  });

    const handleAssignmentChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAssignment({ ...assignment, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access-token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/assignment/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assignment),
            });

            if (!response.ok) {
                throw new Error('Failed to create assignment');
            }

            const data = await response.json();
            router.push('/assignments');
        } catch (error) {
            console.error('Error creating assignment:', error);
        }
    };

    return (
        <>
        <Navbar />
        <br />
        <form onSubmit={handleSubmit} className="container mx-auto max-w-md p-4 bg-gray-100 shadow-md rounded mt-16">
            <h2 className="text-2xl font-bold mb-4">Create Assignment</h2>

            {/* Title */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={assignment.title}
                    onChange={handleAssignmentChange}
                    className="block w-full p-3 rounded"
                    required
                />
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                    name="description"
                    value={assignment.description}
                    onChange={handleAssignmentChange}
                    className="block w-full p-3 rounded"
                    required
                ></textarea>
            </div>

            {/* Due Date */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={assignment.dueDate}
                    onChange={handleAssignmentChange}
                    className="block w-full p-3 rounded"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 rounded transition"
            >
                Create Assignment
            </button>
        </form>
        </>
    );
};

export default CreateAssignmentForm;
