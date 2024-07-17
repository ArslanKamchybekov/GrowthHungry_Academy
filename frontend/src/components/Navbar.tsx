"use client"
import React from "react";
import { useState } from "react";
import { Search, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation'
import Link from "next/link";

const Navbar = () => {
    const router = useRouter()
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = async (e: any) => {
        // e.preventDefault();
        // setSearchInput(e.target.value);
        console.log(e.target.value)
        setSearchInput(e.target.value);
    }

    return (
        <div className="h-[80px] fixed inset-y-0 w-full z-[49]">
                <div className="p-4 gap-x-4 h-full flex items-center bg-white border-b">
                    <a href="/">
                        <div className="items-center gap-x-2 hidden lg:flex hover:opacity-75 transition-opacity">
                            <div className="leading-tight">
                                <p className="font-semibold text-base text-sky-700">Learning Management System</p>
                                <p className="text-xs text-muted-foreground text-sky-700">Build something great!</p>
                            </div>
                        </div>
                    </a>
                    <div className="ml-auto hidden lg:block">
                        <form className="flex items-center relative">
                            <input 
                                className="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full lg:w-[600px] rounded-lg rounded-r-none focus-visible:ring-transparent pr-8" 
                                placeholder="Search for a course"
                                onChange={handleChange}
                            />
                            <button onClick={() => router.push('/login')} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-700 text-white hover:bg-sky-700/80 h-10 px-4 py-2 rounded-l-none" type="submit">
                                <Search />
                            </button>
                        </form>
                    </div>
                    <div className="flex items-center gap-x-2 ml-auto">
                        <Link href={"/login"}>
                        <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-blue-500 h-9 rounded-md px-3">
                            Login
                        </button>
                        </Link>
                    </div>
                </div>
        </div> 
    )
}

export default Navbar;