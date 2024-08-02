import CourseProgressSidebar from "@/components/CourseProgressSidebar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CourseProgress = () => {
    const router = useRouter()
    const { id } = router.query
    const stringId = id?.toString()
    const [title, setTitle] = useState("")

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`http://localhost:8000/content/${id}`);
                const data = await response.json();
                console.log(data)
                setTitle(data.name)
              } catch (error) {
                console.error('Error fetching courses:', error);
              }
        }

        fetchCourse()
    }, [])


    return (
      <>
        <CourseProgressSidebar title={title} />
      </>
    )
}

export default CourseProgress