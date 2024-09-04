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
            console.log('Assignment created successfully:', data);
            router.push('/assignments');
        } catch (error) {
            console.error('Error creating assignment:', error);
        }
    };

    return (
        <>
        <Navbar />
        <br />
        <div className="container mx-auto mt-16 py-12">
            <h1 className="text-4xl font-bold text-black text-center mb-4">
                Create Assignment
            </h1>
            <form onSubmit={handleSubmit} className="container mx-auto px-4 py-12">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={assignment.title}
                        onChange={handleAssignmentChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={assignment.description}
                        onChange={handleAssignmentChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Due Date
                    </label>
                    <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        value={assignment.dueDate}
                        onChange={handleAssignmentChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-black text-white font-semibold px-4 py-2 rounded-md mt-4 hover:bg-gray-700 transition"
                >
                    Create Assignment
                </button>
            </form>
        </div>
        </>
    );
};

export default CreateAssignmentForm;
