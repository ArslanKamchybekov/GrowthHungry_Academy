"use client";

import { useRouter } from 'next/router';
import { Compass, Trophy } from 'lucide-react';
import styles from '../styles/sidebar.module.css'; // Import CSS module

const Sidebar: React.FC = () => {
    const router = useRouter();

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                <button
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    onClick={() => handleNavigate('/')} // Navigate to all courses
                >
                    <Compass className={styles.icon} />
                    Browse
                </button>
                <button
                    className={`${styles.button} ${styles.buttonSecondary}`}
                    onClick={() => handleNavigate('/leadership')}
                >
                    <Trophy className={styles.icon} />
                    Leadership
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
