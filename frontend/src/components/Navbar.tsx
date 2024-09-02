"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import useCurrentUser from "../hooks/useAuth";

const Navbar = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, loading, error } = useCurrentUser();

    const handleSignOut = () => {
        localStorage.removeItem("access-token");
        setIsAuthenticated(false);
        router.push("/");
    };

    useEffect(() => {
        const token = localStorage.getItem("access-token");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <div className="h-[70px] fixed inset-x-0 top-0 w-full z-[49] bg-white border-b shadow-md">
            <div className="p-4 gap-x-4 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" passHref>
                    <div className="items-center gap-x-2 flex hover:opacity-75 transition-opacity cursor-pointer">
                        <img src="/assets/logo.png" alt="GrowthHungry Logo" className="h-8 w-8" />
                        <div className="leading-tight m-2">
                            <p className="font-semibold text-base text-sky-700">GrowthHungry Academy</p>
                            <p className="text-xs text-muted-foreground text-sky-700">Compound your learning!</p>
                        </div>
                    </div>
                </Link>

                {/* Desktop Search and Links */}
                <div className="hidden lg:flex items-center">
                    {/* Desktop Menu Links */}
                    <div className="flex items-center gap-x-2 ml-4">
                        {isAuthenticated ? (
                            <>
                                <Link href="/leadership" passHref>
                                    <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background h-9 rounded-md px-3">
                                        Leadership
                                    </button>
                                </Link>
                                <Link href={`/profile/${user?.userId}`} passHref>
                                    <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background h-9 rounded-md px-3">
                                        Profile
                                    </button>
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background text-red-700 h-9 rounded-md px-3"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/signin" passHref>
                                    <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-background h-9 rounded-md px-3">
                                        Sign In
                                    </button>
                                </Link>
                                <Link href="/signup" passHref>
                                    <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-background h-9 rounded-md px-3">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden p-4 bg-white border-t">
                    {isAuthenticated ? (
                        <>
                            <Link href="/leadership" passHref>
                                <button className="block w-full text-left text-sm font-medium transition-colors hover:bg-gray-100 py-2 px-4">
                                    Leadership
                                </button>
                            </Link>
                            <Link href={`/profile/${user?.userId}`} passHref>
                                <button className="block w-full text-left text-sm font-medium transition-colors hover:bg-gray-100 py-2 px-4">
                                    Profile
                                </button>
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="block w-full text-left text-sm font-medium text-red-500 transition-colors hover:bg-gray-100 py-2 px-4"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/signin" passHref>
                                <button className="block w-full text-left text-sm font-medium transition-colors hover:bg-gray-100 py-2 px-4">
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/signup" passHref>
                                <button className="block w-full text-left text-sm font-medium transition-colors hover:bg-gray-100 py-2 px-4">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
