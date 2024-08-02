// Add props like the title
interface CourseProgressSidebarProps {
    title: string;
}

const CourseProgressSidebar: React.FC<CourseProgressSidebarProps> = ({ title }) => {
    return (
        <>
            <div className="h-full border-r flex flex-col shadow-sm bg-white">
                <div className="p-8 flex flex-col border-b">
                    <h1>{title}</h1>
                </div>
            </div>
        </>
    )
}

export default CourseProgressSidebar