import { useState } from "react";
import { Menu, X } from "lucide-react";

interface Course {
    title: string;
    description: string;
    videoUrl: string | null;
    videoLength: number;
    _id: string;
}

interface CourseProgressProps {
    titleCourse: string;
    links: Course[];
    id: string;
}

const CourseProgressSidebar: React.FC<CourseProgressProps> = ({ id, titleCourse, links }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="bg-white border-b md:hidden">
                <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-bold">{titleCourse}</h1>
                <button
                    className="text-gray-800 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={20} />}
                </button>
                </div>
                {isMobileMenuOpen && (
                <div className="flex flex-col px-4 pb-4 space-y-2">
                    <a href="/" className="text-gray-800 hover:text-gray-600">
                        Home
                    </a>
                </div>
                )}
            </nav>

            {/* Sidebar for Larger Screens */}
            <div className="hidden lg:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <div className="h-full border-r flex flex-col shadow-sm bg-white">
                    <div className="p-8 flex flex-col border-b">
                        <a href="/" className="flex items-center mb-4">
                            <span className="font-bold">{titleCourse}</span>
                        </a>
                        <div className="mt-4">
                            <div>
                                <div
                                    aria-valuenow={0}
                                    aria-valuemax={100}
                                    aria-valuemin={0}
                                    role="progressbar"
                                    data-state="indeterminate"
                                    data-max="100"
                                    className="relative w-full overflow-hidden border h-2 rounded-[2px] border-none bg-emerald-500/20"
                                >
                                    <div
                                        data-state="indeterminate"
                                        data-max="100"
                                        className="h-full w-full flex-1 transition-all bg-emerald-700"
                                        style={{ transform: "translateX(-70%)", width: "0" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div dir="ltr" className="relative overflow-hidden flex flex-col w-full" style={{ position: "relative" }}>
                            <style>
                                {`[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`}
                            </style>
                            <div data-radix-scroll-area-viewport className="h-full w-full rounded-[inherit]">
                                <div style={{ minWidth: 100, display: "table" }}>
                                    {links?.map((link, index) => (
                                        <a key={index} href={`/course/progress/${id}/chapters/${link._id}`}>
                                            <div className="flex w-full text-sm items-center p-5 border-b hover:bg-muted transition-background group">
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
    );
};

export default CourseProgressSidebar;
