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
                                    Course Title
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Sed ut perspiciatis unde omnis isteem aperiam,  aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                                </p>
                                <div className="mt-4">
                                    <p className="font-medium text-sky-700 text-xs">0% Complete</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
                            {/* Add additional content here */}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Course;
