import React, { FC } from 'react';
import { Poppins } from 'next/font/google';

type Props = {

} 

//Hero component: search courses, intro, about, call to action
const Hero: React.FC<Props> = (props) => {
    return(
        <div className="bg-gray-100">
            <div className="container mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold my-2 text-gray-800">Welcome to GH Academy</h2>
                <h3 className="text-2xl mb-8 text-gray-600">Learn the latest technologies with our hands-on courses</h3>
                <div className="flex items-center">
                    <input className="w-full px-5 py-3 mr-3 shadow-md rounded-lg" type="text" placeholder="What do you want to learn?"/>
                    <button className="bg-blue-500 text-white px-5 py-3 rounded-lg">Search</button>
                </div>
            </div>
        </div>
    )
}

export default Hero;