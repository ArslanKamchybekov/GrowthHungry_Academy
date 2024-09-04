import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Course } from "@/pages/types/types";
import CourseProgressSidebar from "@/components/CourseProgressSidebar";
import CourseProgressChapter from "./[id]/chapters/[chapterid]";
import { Menu, X } from "lucide-react";

const CourseProgress = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState<Course[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) throw new Error("No token found");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/content/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Course not found");
        }
        const data = await response.json();
        console.log(data);
        setTitle(data.name);
        setLinks(data.courseData);
      } catch (error) {
        console.error("Error fetching course:", error);
        router.push("/signin");
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (links.length > 0) {
      navigateToChapter(links[0]._id);
    }
  }, [links]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToChapter = (chapterId: string) => {
    router.push(`/course/progress/${id}/chapters/${chapterId}`);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Chapter Menu */}
      <div className="md:hidden">
        <div className="p-4 flex justify-between items-center bg-white shadow">
          <h1 className="text-xl font-bold" onClick={() => router.push("/")}>{title}</h1>
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="p-4 space-y-2 bg-white">
            {links.map((chapter) => (
              <button
                key={chapter._id}
                onClick={() => navigateToChapter(chapter._id)}
                className="w-full text-left px-4 py-2 text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                {chapter.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar and Chapter Content for Larger Screens */}
      <div className="hidden md:flex">
        <CourseProgressSidebar id={id as string} titleCourse={title} links={links} />
      </div>
      <CourseProgressChapter />
    </>
  );
};

export default CourseProgress;
