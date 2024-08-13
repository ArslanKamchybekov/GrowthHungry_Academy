import React, {FC} from "react";

interface HeadProps {
    title: string;
    description: string;
}

const Heading: FC<HeadProps> = ({title, description}) => {
    return (
        <head>
            <title>{title}</title>
            <meta name="description" content={description}/>
        </head>
    )
}

export default Heading; 