import { useState, useEffect } from 'react'
import axios from 'axios'

interface Video {

}

const useFetchVideos = async() => {
    const [videos, setVideos] = useState<Video[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideos = async() => {
            try {
                const response = await axios.get<Video[]>('http://localhost:4000/users');
                setVideos(response.data);
            }catch(err){
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchVideos();
    }, [])
    return { videos, loading, error }
}

export default useFetchVideos;