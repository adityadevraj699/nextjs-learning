"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) {
                setError("Registration failed");
                return;
            }
            router.push('/login');
        } catch (error) {
            setError("Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-96 bg-white shadow-xl p-6">
                <h2 className="text-center text-2xl font-bold">Register</h2>
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="input input-bordered w-full" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="input input-bordered w-full" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className="input input-bordered w-full" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="btn btn-primary w-full">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
