import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../course.module.css";
import CourseProgressSidebar from "@/components/CourseProgressSidebar";
import { Course } from "@/pages/types/types";

const CourseProgressChapter: React.FC = () => {
    const router = useRouter();
    const { id, chapterid } = router.query; 
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [links, setLinks] = useState<Course[]>([]);
    const [video, setVideo] = useState("");
    const [currentChapter, setCurrentChapter] = useState("");
    const [currentDescription, setCurrentDescription] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            if (!id || !chapterid) return;
            
            try {
                setLoading(true);
                
                const token = localStorage.getItem('access-token');
                if (!token) router.push('/signin');

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course/content/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch course. Please try again later.');
                }

                const data = await response.json();
                setTitle(data.name);
                setLinks(data.courseData);
            } catch (error: any) {
                console.error('Error fetching course:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id, chapterid]);

    useEffect(() => {
        if (links.length > 0 && chapterid) {
            const chapterData = links.find((item) => item._id === chapterid);

            if (chapterData) {
                setVideo(chapterData.videoUrl as string);
                setCurrentDescription(chapterData.description);
                setCurrentChapter(chapterData.title);
            }
        }
    }, [links, chapterid]);

    const handleNextChapter = () => {
        const currentIndex = links.findIndex((item) => item._id === chapterid);
        const nextIndex = currentIndex + 1;

        if (nextIndex < links.length) {
            router.push(`/course/progress/${id}/chapters/${links[nextIndex]._id}`);
        }
    }

    const handlePrevChapter = () => {
        const currentIndex = links.findIndex((item) => item._id === chapterid);
        const prevIndex = currentIndex - 1;

        if (prevIndex >= 0) {
            router.push(`/course/progress/${id}/chapters/${links[prevIndex]._id}`);
        }
    }

    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        );
      }

    return (
        <>
            <CourseProgressSidebar id={id as string} titleCourse={title} links={links} />
            <main className="lg:pl-80 pt-[80px] h-full">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="mb-6">
                        <div className="relative aspect-video overflow-hidden bg-slate-100 rounded-md shadow-lg">
                            <div className="absolute inset-0 w-full h-full" data-vimeo-initialized="true">
                                <div className={`${styles.videoContainer} w-full h-full`}>
                                    {video ? (
                                        <iframe
                                            src={video.replace('youtu.be/', 'www.youtube.com/embed/')}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            className={`${styles.videoIframe} w-full h-full rounded-md`}
                                        ></iframe>
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-white text-lg font-bold">
                                        
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">{currentChapter}</h2>
                        <p className="text-gray-700 mb-4">{currentDescription}</p>
                        <div className="flex flex-col lg:flex-row gap-4 mt-6">
                            <div className="flex space-x-4">
                                {/* <button
                                    className="bg-black hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
                                    onClick={() => handleMarkAsCompleted(chapterid as string)}
                                >
                                    Mark as completed
                                </button> */}
                                <button className="bg-black hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition duration-200" onClick={handlePrevChapter}>
                                    Previous chapter
                                </button>
                                <button className="bg-black hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition duration-200" onClick={handleNextChapter}>
                                    Next chapter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );    
};

export default CourseProgressChapter;
