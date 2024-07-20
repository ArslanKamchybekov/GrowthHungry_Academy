"use client";
import { Compass, Trophy } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarContent">
                <button className="button buttonPrimary">
                    <Compass className="icon" />
                    Browse
                </button>
                <button className="button buttonSecondary">
                    <Trophy className="icon" />
                    Leadership
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
