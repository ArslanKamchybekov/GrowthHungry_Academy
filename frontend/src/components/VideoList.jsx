import React from "react";
import useFetchVideos from "../useFetchData.ts";

const VideoList = () => {
    const { videos, loading, error } = useFetchVideos();
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Video List</h1>
            <ul>
                {videos.map(video => (
                    <li key={video.id}>
                        <h2>{video.title}</h2>
                        <video width="320" height="240" controls>
                            <source src={video.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default VideoList;