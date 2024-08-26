"use client";
import React, { useState, useEffect } from "react";
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Navbar = () => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        console.log(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search functionality here
    };

    const handleSignOut = () => {
        localStorage.removeItem('access-token');
        setIsAuthenticated(false);
        router.push('/');
    };

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <div className="h-[80px] fixed inset-x-0 top-0 w-full z-[49] bg-white border-b">
            <div className="p-4 gap-x-4 h-full flex items-center">
                <Link href="/" passHref>
                    <div className="items-center gap-x-2 hidden lg:flex hover:opacity-75 transition-opacity cursor-pointer">
                        <div className="leading-tight">
                            <p className="font-semibold text-base text-sky-700">Learning Management System</p>
                            <p className="text-xs text-muted-foreground text-sky-700">Build something great!</p>
                        </div>
                    </div>
                </Link>
                <div className="ml-auto hidden lg:block">
                    <form onSubmit={handleSearchSubmit} className="flex items-center relative">
                        <input
                            type="text"
                            className="flex h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full lg:w-[600px] rounded-lg rounded-r-none focus-visible:ring-transparent pr-8"
                            placeholder="Search for a course"
                            value={searchInput}
                            onChange={handleChange}
                            aria-label="Search for a course"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-700 text-white hover:bg-sky-700/80 h-10 px-4 py-2 rounded-l-none"
                        >
                            <Search />
                        </button>
                    </form>
                </div>
                <div className="flex items-center gap-x-2 ml-auto">
                    {isAuthenticated ? (
                        <>
                            <Link href="/profile" passHref>
                                <button
                                    className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-blue-500 h-9 rounded-md px-3"
                                    aria-label="Profile"
                                >
                                    Profile
                                </button>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-red-500 h-9 rounded-md px-3"
                                aria-label="Sign Out"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/signin" passHref>
                                <button
                                    className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-blue-500 h-9 rounded-md px-3"
                                    aria-label="Sign In"
                                >
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/signup" passHref>
                                <button
                                    className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-blue-500 h-9 rounded-md px-3"
                                    aria-label="Sign Up"
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
