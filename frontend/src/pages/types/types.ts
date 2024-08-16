export interface Course {
    title: string;
    description: string;
    videoUrl: string | null;
    videoLength: number;
    _id: string;
}

export interface CourseProgressProps {
    titleCourse: string;
    links: Course[];
    id: string;
}