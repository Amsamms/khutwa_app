'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { User, Lock, Home } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('Fahad.j@gmail.com');
  const [password, setPassword] = useState('*******************');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Extract name from email (before @) or use email if no @ found
    const name = email.includes('@') ? email.split('@')[0].replace(/[._]/g, ' ') : email;
    // Capitalize first letter of each word
    const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    localStorage.setItem('user', JSON.stringify({ name: capitalizedName, email: email }));
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ border: '2px solid #93c5fd' }}>
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <Logo size="sm" showText={true} />
        <Home className="w-8 h-8 text-primary-500" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Text */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-medium text-black">Welcome Back</h1>
            <h2 className="text-xl text-gray-600">Fahad</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 mt-12">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 bg-white"
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 bg-white"
                placeholder="Password"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-4 rounded-lg text-base font-medium hover:bg-primary-600 transition-colors mt-8"
            >
              sign In (Parent)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}