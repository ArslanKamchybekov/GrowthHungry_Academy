import CourseProgressSidebar from "@/components/CourseProgressSidebar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CourseProgress = () => {
    const router = useRouter()
    const { id } = router.query
    const [title, setTitle] = useState("")

    useEffect(() => {
        if (!id) return;

        const fetchCourse = async () => {
            try {
                const token = localStorage.getItem('access-token');
                if (!token) throw new Error('No token found');

                console.log('Token:', token)

                const response = await fetch(`http://localhost:8000/course/content/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Course not found');
                }
                const data = await response.json();
                console.log(data)
                setTitle(data.name)
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        }

        fetchCourse()
    }, [id])

    return (
        <>
            <CourseProgressSidebar title={title} />
        </>
    )
}

export default CourseProgress
