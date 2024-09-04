"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    console.log(token);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (!token) {
        setError("No reset token found. Please try resetting your password again.");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token as string,
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Failed to reset password");
      }

      setSuccess("Password reset successfully. You can now log in with your new password.");
      setTimeout(() => {
        router.push("/signin");
      }, 3000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reset Password</h2>
        {success && <p className="mb-4 text-green-600">{success}</p>}
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm New Password</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-gray-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {loading ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-2 border-t-2 border-gray-800 rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              Reset Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
