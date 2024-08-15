import Link from 'next/link';
import React, { FC } from 'react'

export const navItemsData = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Courses',
        url: '/courses'
    },
    {
        name: 'About',
        url: '/about'
    },
]


type Props = {
    activeItem: number;
    isMobile: boolean;
} 

const NavItems: React.FC<Props> = ({activeItem, isMobile}) => {
  return (
    <>
        {navItemsData.map((item, index) => (
            <Link
                key={index}
                href={item.url}
            >
                <p className={`text-black font-semibold cursor-pointer ${activeItem === index ? 'text-blue-500' : ''} ${isMobile ? 'block py-2' : 'px-4'}`}>
                    {item.name}
                </p>
            </Link>
        ))}
    </>
  )
}

export default NavItems
