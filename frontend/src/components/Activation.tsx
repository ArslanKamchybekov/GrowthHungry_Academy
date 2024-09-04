"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Activation: React.FC = () => {
    const router = useRouter();
    const { token, code } = router.query;
    const [message, setMessage] = useState('');

    useEffect(() => {
        const activateUser = async () => {
            if (token && code) {
                try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/activate`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ activation_token: token, activation_code: code }),
                });

                if (response.ok) {
                    setMessage('Your account has been activated successfully.');
                } else {
                    setMessage('Activation failed. Please check your activation link.');
                }
                } catch (error) {
                setMessage('An error occurred during activation.');
                }
            }
            else {
                setMessage("Please check your email in order to activate your account.")
            }
        };

        activateUser();
    }, [token, code]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{message}</h2>
        </div>
        </div>
    );
};

export default Activation;
