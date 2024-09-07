import { useEffect, useState } from 'react';

export const useRefreshToken = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const refreshToken = localStorage.getItem('refresh-token');
                if (!refreshToken) {
                    throw new Error('No refresh token found');
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ refreshToken })
                });

                if (!response.ok) {
                    throw new Error('Failed to refresh token');
                }

                const data = await response.json();
                localStorage.setItem('access-token', data.accessToken);
            } catch (err: any) {
                setError(err.message);
                console.error('Error refreshing token:', err);
            } finally {
                setLoading(false);
            }
        };

        refreshAccessToken();
    }, []);

    return { loading, error };
}