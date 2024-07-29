"use client";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { BookOpen } from 'lucide-react';
import styles from './course.module.css'; // Import CSS module

const Course = () => {
    return (
        <>
            <Navbar />
            <div className={styles.pageWrapper}>
                <Sidebar/>
                <main className={styles.mainContent}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
                            <div className="border rounded-md overflow-hidden bg-white">
                                <div className={styles.videoContainer}>
                                    <iframe
                                        src="https://www.youtube.com/embed/kf6yyxMck8Y?si=rXhTTDQuhuiB3ZrU"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                        className={styles.videoIframe}
                                    ></iframe>
                                </div>
                            </div>
                            <div className="border rounded-md p-6 bg-white">
                                <div className="flex items-center gap-x-2 mb-3">
                                    <div className="inline-flex items-center border rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-sky-500/10 text-sky-800">
                                        <BookOpen className="mr-1" />
                                        <span>10 chapters</span>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-lg md:text-2xl mb-2 capitalize">
                                    Web Development Crash Course
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Learn the basics of web development with this crash course. This course will cover the fundamentals of HTML, CSS, and JavaScript. By the end of this course, you will have built a simple web page. No prior experience is required.
                                </p>
                                <div className="mt-4">
                                    <p className="font-medium text-sky-700 text-xs">30% Complete</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
                            <div className="border rounded-md p-6 text-secondary bg-white">
                                <div className="mb-7">
                                    <h4 className="font-semibold text-xl mb-4">Ready to learn?</h4>
                                    <p className="text-gray-700">Start your learning journey and track your progress through the course.</p>
                                </div>
                                <button type="button" className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full border border-solid border-black">
                                    <a href="/course/progress">Watch course</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Course;
