"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePicture(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

      // if (profilePicture) {
      //   formData.append('avatar', profilePicture);
      // }

      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/activate');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign up</h2>
        <form onSubmit={handleSignUp} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-gray-300"
              onChange={handleProfilePictureChange}
              accept="image/*"
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </div> */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Sign up
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/signin" className="text-gray-600 hover:underline">
                Log in
              </a>
            </p>
          </div>
          {error && <p className="mt-2 text-red-600">{error}</p>}
        </form>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Supported by GrowthHungry Academy</p>
      </div>
    </div>
  );
};

export default SignUp;
