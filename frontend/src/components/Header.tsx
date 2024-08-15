'use client'
import React, {FC, useState} from 'react';
import Link from 'next/link';
import NavItems from '../utils/NavItems';
import { HiOutlineUserCircle } from 'react-icons/hi';
import CustomModal from '@/utils/CustomModal';
import SignIn from './SignIn';
import SignUp from './SignUp';

type Props = {
    open: boolean;
    setOpen: (open : boolean) => void;
    activeItem: number;
    setRoute: (route: string) => void;
    route: string;
}

const Header: FC<Props> = ({activeItem, setOpen, route, open, setRoute}) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [active, setActive] = useState(false);

    if(typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100) {
                setActive(true);
            } else {
                setActive(false); 
            }
        })
    }

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ${openSidebar ? 'py-2' : 'py-4'}`}>
            <div className="container flex items-center justify-between">
                <Link href="/" className='ml-8'>
                    <img src="/assets/lms.png" alt="GH Academy" className="h-10 w-10 cursor-pointer"/>
                </Link>
                <div className="hidden md:flex items-center">
                    <NavItems activeItem={activeItem} isMobile={false}/>
                    <Link href="/signin">
                        <p className="text-black font-semibold cursor-pointer px-4">Sign In</p>
                    </Link>
                    <Link href="/signup">
                        <p className="text-black font-semibold cursor-pointer px-4">Sign Up</p>
                    </Link>
                    <HiOutlineUserCircle className="h-8 w-8 cursor-pointer ml-8"/>
                </div>
                <div className="md:hidden flex items-center mr-2">
                    <button onClick={() => setOpenSidebar(!openSidebar)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`md:hidden ml-2 ${openSidebar ? 'block' : 'hidden'}`}>
                <NavItems activeItem={activeItem} isMobile={true}/>
            </div> 
            {/* {
                route === 'SignIn' && (
                    <>
                        {
                            open && ( 
                                <CustomModal open={open} setOpen={setOpen} activeItem={activeItem} component={SignIn} setRoute={setRoute}/>
                            )
                        }
                    </>
                )
            }
            {
                route === 'SignUp' && (
                    <>
                        {
                            open && ( 
                                <CustomModal open={open} setOpen={setOpen} activeItem={activeItem} component={SignUp} setRoute={setRoute}/>
                            )
                        }
                    </>
                )
            } */}
        </div>
    )
}

export default Header