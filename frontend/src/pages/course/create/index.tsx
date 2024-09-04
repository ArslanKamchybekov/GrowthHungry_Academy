// components/CreateCourseForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface ICourseData {
  title: string;
  description: string;
  videoUrl: string;
}

interface ICourse {
  name: string;
  description: string;
  prerequisites: string;
  thumbnail: {
    public_id: string;
    url: string;
  };
  courseData: ICourseData[];
}

const CreateCourseForm: React.FC = () => {
  const router = useRouter();  
  const [course, setCourse] = useState<ICourse>({
    name: "",
    description: "",
    prerequisites: "",
    thumbnail: {
      public_id: "",
      url: "",
    },
    courseData: [{ title: "", description: "", videoUrl: "" }],
  });

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setCourse({
        ...course,
        thumbnail: { public_id: file.name, url: objectURL },
      });
    }
  };

  const handleCourseDataChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newCourseData = [...course.courseData];
    newCourseData[index] = {
      ...newCourseData[index],
      [e.target.name]: e.target.value,
    };
    setCourse({ ...course, courseData: newCourseData });
  };

  const addCourseData = () => {
    setCourse({
      ...course,
      courseData: [...course.courseData, { title: "", description: "", videoUrl: "" }],
    });
  };

  const removeCourseData = (index: number) => {
    const newCourseData = course.courseData.filter((_, i) => i !== index);
    setCourse({ ...course, courseData: newCourseData });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access-token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/course/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      const data = await response.json();
      console.log("Course created successfully:", data);
      setCourse({
        name: "",
        description: "",
        prerequisites: "",
        thumbnail: { public_id: "", url: "" },
        courseData: [{ title: "", description: "", videoUrl: "" }],
      });
      
      router.push("/");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <>
    <Navbar />
    <br />
      <form onSubmit={handleSubmit} className="max-w-lg mx-2 p-4 shadow-md rounded my-16 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>

      {/* Course Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Course Name</label>
        <input
          type="text"
          name="name"
          value={course.name}
          onChange={handleCourseChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Course Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Description</label>
        <textarea
          name="description"
          value={course.description}
          onChange={handleCourseChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Course Prerequisites */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Prerequisites</label>
        <input
          type="text"
          name="prerequisites"
          value={course.prerequisites}
          onChange={handleCourseChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Thumbnail Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Thumbnail</label>
        <input type="file" onChange={handleThumbnailChange} className="w-full p-2 border rounded" />
        {course.thumbnail.url && (
          <img src={course.thumbnail.url} alt="Thumbnail Preview" className="mt-2 max-h-32" />
        )}
      </div>

      {/* Course Data (multiple entries) */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Course Content</h3>
        {course.courseData.map((data, index) => (
          <div key={index} className="mb-4 border p-2 rounded">
            <div className="mb-2">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={(e) => handleCourseDataChange(index, e)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={data.description}
                onChange={(e) => handleCourseDataChange(index, e)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Video URL</label>
              <input
                type="url"
                name="videoUrl"
                value={data.videoUrl}
                onChange={(e) => handleCourseDataChange(index, e)}
                className="w-full p-2 border rounded"
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeCourseData(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addCourseData} className="bg-gray-400 text-white px-4 py-2 rounded font-semibold hover:bg-gray-700 transition">
          Add Course Data
        </button>
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-black text-white font-semibold px-4 py-2 rounded hover:bg-gray-700 transition">
        Create Course
      </button>
    </form>
    </>
  );
};

export default CreateCourseForm;
