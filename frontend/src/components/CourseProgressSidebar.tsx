// Add props like the title
interface CourseProgressSidebarProps {
    title: string;
    links: Course[];
}

interface Course {
    title: string;
    description: string;
    videoUrl: string | null;
    videoLength: number;
    _id: string;
}

const CourseProgressSidebar: React.FC<CourseProgressSidebarProps> = ({ title, links }) => {
    return (
        <>
            <div className="hidden lg:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <div className="h-full border-r flex flex-col shadow-sm bg-white">
                    <div className="p-8 flex flex-col border-b">
                        <h1 className="font-semibold line-clamp-2">{title}</h1>
                        <div className="mt-4">
                            <div>
                                <div aria-valuenow={0} aria-valuemax={100} aria-valuemin={0} role="progressbar" data-state="indeterminate" data-max="100" className="relative w-full overflow-hidden border h-2 rounded-[2px] border-none bg-emerald-500/20">
                                    <div data-state="indeterminate" data-max="100" className="h-full w-full flex-1 transition-all bg-emerald-700" style={{transform: "translateX(-70%);", width: "0"}}></div>
                                </div>
                                <p className="font-medium mt-2 text-emerald-700 text-sm">0% Progress</p>
                            </div>
                        </div>
                        <div dir="ltr" className="relative overflow-hidden flex flex-col w-full" style={{ position: "relative" }}>
                            <style>
                                {`[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`}
                            </style>
                            <div data-radix-scroll-area-viewport className="h-full w-full rounded-[inherit]">
                                <div style={{ minWidth: 100, display: "table" }}>
                                    {links.map((link, index) => (
                                        <a key={index} href={link.videoUrl || "#"}>
                                            <div className="flex w-full text-sm items-center p-5 border-b hover:bg-muted transition-background group text-emerald-700">
                                                {link.title}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseProgressSidebar