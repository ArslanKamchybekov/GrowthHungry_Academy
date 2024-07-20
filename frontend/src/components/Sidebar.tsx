"use client";

import { Compass, Trophy } from 'lucide-react';
import styles from './sidebar.module.css'; // Import CSS module

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                <button className={`${styles.button} ${styles.buttonPrimary}`}>
                    <Compass className={styles.icon} />
                    Browse
                </button>
                <button className={`${styles.button} ${styles.buttonSecondary}`}>
                    <Trophy className={styles.icon} />
                    Leadership
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
