import CourseProgressSidebar from "@/components/CourseProgressSidebar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "../course.module.css";

interface Course {
    title: string;
    description: string;
    videoUrl: string | null;
    videoLength: number;
    _id: string;
}

const CourseProgress = () => {
    const router = useRouter()
    const { id } = router.query
    const [title, setTitle] = useState("")
    const [links, setLinks] = useState<Course[]>([]);
    const [currentCourseTitle, setCurrentCourseTitle] = useState("")
    const [currentDescription, setCurrentDescription] = useState("")

    useEffect(() => {
        if (!id) return;

        const fetchCourse = async () => {
            try {
                const token = localStorage.getItem('access-token');
                if (!token) throw new Error('No token found');

                const response = await fetch(`http://localhost:8000/course/content/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Course not found');
                }
                const data = await response.json();
                console.log(data)
                setTitle(data.name)
                setLinks(data.courseData)
                setCurrentDescription(data.courseData[0].description)
                if (data.courseData.length > 0) {
                    setCurrentCourseTitle(data.courseData[0].title)
                }

            } catch (error) {
                console.error('Error fetching course:', error);
            }
        }

        fetchCourse()
    }, [id])

    return (
        <>
            <CourseProgressSidebar title={title} links={links} />
            <main className="lg:pl-80 pt-[80px] h-full">
                <div>
                    <div className="mb-6">
                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                            <div className="absolute inset-y-0 inset-x-0 w-full h-full" data-vimeo-initialized="true">
                                <div className={styles.videoContainer}>
                                    {/* Placeholder for now */}
                                    <iframe
                                        src="https://www.youtube.com/embed/kf6yyxMck8Y?si=rXhTTDQuhuiB3ZrU"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                        className={styles.videoIframe}
                                        width={640}
                                        height={360}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-screen-lg mx-auto pb-20 p-4">
                        <div>
                            <div className="border rounded-md p-6 flex flex-col lg:flex-row items-center justify-between bg-white">
                                {/* Title should come from the courseData array such as Introduction to Programming for the first course */}
                                <h2 className="text-lg lg:text-2xl font-semibold mb-2 lg:mb-0 lg:text-center">{currentDescription}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default CourseProgress
