import React from 'react';
import useFetchVideos from '../hooks/useFetchVideos';

const VideoList = () => {
  const { videos, loading, error } = useFetchVideos();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {videos && videos.map(video => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <video controls width="600">
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoList;