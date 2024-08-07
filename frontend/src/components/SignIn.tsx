"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8000',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });


      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      console.log('Response data:', data);

      localStorage.setItem('access-token', data.token);
      console.log('Token stored:', data.token);
      router.push('/course');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign in</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <button type="button" className="text-gray-400 focus:outline-none focus:text-gray-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h3m0 0v3m0-3h-3m3 0v-3" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" name="remember" className="h-4 w-4 text-gray-600" />
              <label htmlFor="remember" className="ml-2 block text-gray-900">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >

            Sign in
          </button>
          {error && <p className="mt-2 text-red-600">{error}</p>}
        </form>
        <div className="mt-6 flex items-center justify-center">
          <div className="border-t w-full"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="border-t w-full"></div>
        </div>
        <button
          type="button"
          className="mt-4 w-full flex items-center justify-center bg-white border border-gray-300 p-2 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <FaGoogle className="mr-2" />
          Continue with Google
        </button>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account? <a href="/signup" className="text-gray-600 hover:underline">Create now</a>
          </p>
        </div>
      </div>
      <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Supported by GrowthHungry Academy</p>
        </div>
    </div>
  );
};

export default SignIn;
