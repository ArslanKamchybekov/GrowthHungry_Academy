"use client"

import Link from "next/link";
import { Compass, Trophy } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="h-full flex flex-col bg-white border-r overflow-y-auto">
            <div className="flex flex-col w-full space-y-1.5 p-3">
                <button className="flex w-full text-sm items-center py-3.5 px-3 hover:bg-muted rounded-lg transition-background group bg-muted text-primary font-medium">
                    <Compass />
                    Browse
                </button>
                <button className="flex w-full text-sm text-muted-foreground items-center py-3.5 px-3 hover:bg-muted rounded-lg transition-background group">
                    <Trophy />
                    Leadership
                </button>
            </div>
        </div>
    )
}

export default Sidebar;