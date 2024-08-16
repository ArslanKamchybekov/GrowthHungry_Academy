import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "../../../course.module.css"
import CourseProgressSidebar from "@/components/CourseProgressSidebar";
import { Course, CourseProgressProps } from "@/pages/types/types";

const CourseProgressChapter: React.FC = () => {
    const router = useRouter();
    const { id, chapterid } = router.query; 
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("")
    const [links, setLinks] = useState<Course[]>([]);
    const [video, setVideo] = useState("");
    const [currentDescription, setCurrentDescription] = useState("")

    useEffect(() => {
        if (id && chapterid) {
            console.log("Course ID: " + id);
            console.log("Chapter ID: " + chapterid);
            setLoading(false)

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
                    // console.log("Course Data: "+ links)
                    // console.log("Video URL: " + links[0].videoUrl)
                    
                    // const chapterData = links.find(item => item._id === chapterid)
                    // console.log("Chapter Data: " + chapterData)
                    // console.log("Url: " + chapterData?.videoUrl)
                    // setVideo(chapterData?.videoUrl as string)
                } catch (error) {
                    console.error('Error fetching course:', error);
                }
            }
    
            fetchCourse()
        }        
    }, [id, chapterid]); 

    useEffect(() => {
        if (links.length > 0 && chapterid) {
            const chapterData = links.find((item) => item._id === chapterid);
            console.log("Chapter Data: ", chapterData);

            if (chapterData) {
                setVideo(chapterData.videoUrl as string);
                setCurrentDescription(chapterData.description);
            }
        }
    }, [links, chapterid]);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <CourseProgressSidebar id={id as string} titleCourse={title} links={links} />
            <main className="lg:pl-80 pt-[80px] h-full">
                <div>
                    <div className="mb-6">
                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                            <div className="absolute inset-y-0 inset-x-0 w-full h-full" data-vimeo-initialized="true">
                                <div className={styles.videoContainer}>
                                    {video && video.length > 0 ? (
                                        <iframe
                                            src={video.replace('youtu.be/', 'www.youtube.com/embed/')}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            className={styles.videoIframe}
                                            width={640}
                                            height={360}
                                        ></iframe>
                                    ) : (
                                        <div>No video available</div>    
                                    )}
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

export default CourseProgressChapter
