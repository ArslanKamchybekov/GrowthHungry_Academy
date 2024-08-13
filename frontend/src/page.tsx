'use client'
import React, {FC, useState} from 'react';
import Heading from './utils/Heading';
import Navbar from './components/Navbar';

interface Props {}

const Page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Heading title="GH Academy" description="GH Academy is a Learning Management platform for students to level-up their careers!"/>
            <Navbar/>
        </div>
    )
}

export default Page