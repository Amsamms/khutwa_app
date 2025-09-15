'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { MapPin, Bell, Home } from 'lucide-react';

interface Child {
  id: string;
  name: string;
  goal: string;
  progress: number;
  avatar: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    // Set default user (no login required)
    const defaultUser = { name: 'المستخدم', email: 'user@khutwa.app' };
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }

    // Load children from localStorage
    const savedChildren = localStorage.getItem('children');
    if (savedChildren) {
      setChildren(JSON.parse(savedChildren));
    }
  }, [router]);

  const handleDisabledClick = () => {
    alert('قريبًا (Coming Soon)');
  };

  const handleAddChild = () => {
    router.push('/add-child');
  };

  const handleLongTermPlan = () => {
    router.push('/long-term-plan');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <Logo size="sm" showText={true} />
        
        <div className="flex items-center space-x-4">
          <button onClick={handleDisabledClick}>
            <MapPin className="w-6 h-6 text-primary-500" />
          </button>
          <button onClick={handleDisabledClick}>
            <Bell className="w-6 h-6 text-primary-500" />
          </button>
          <button 
            onClick={handleLongTermPlan}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Plan
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Welcome Section - Mobile Optimized */}
        <div>
          <h1 className="text-xl sm:text-2xl font-medium text-black">Welcome, {user.name}</h1>
        </div>

        {/* Long-Term Plan Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg sm:text-xl font-medium text-black">Long-Term Plan</h2>
              <p className="text-sm sm:text-base text-gray-600">Create your financial plan</p>
            </div>
            <div className="text-right">
              <button 
                onClick={handleLongTermPlan}
                className="text-sm text-primary-500 hover:underline"
              >
                Start Planning
              </button>
            </div>
          </div>
          
          {/* Progress Bar - Hidden when no plan exists */}
          <div className="progress-bar" style={{ display: 'none' }}>
            <div className="progress-fill" style={{ width: '0%' }}></div>
          </div>
        </div>

        {/* Children Section */}
        <div className="space-y-6">
          <h2 className="text-lg sm:text-xl font-medium text-black">Children</h2>
          
          {/* Children List */}
          <div className="space-y-4">
            {children.length > 0 ? (
              children.map((child) => (
                <div key={child.id} className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center text-xl">
                    {child.avatar}
                  </div>
                  
                  {/* Child Info and Progress */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-black">{child.name}</h3>
                        <p className="text-sm text-gray-600">{child.goal}</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${child.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">👶</div>
                <p className="text-gray-500 text-base mb-4">No children added yet</p>
                <button 
                  onClick={handleAddChild}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  Add Your First Child
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation - Mobile Optimized */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 space-y-6 md:space-y-0">
          <div className="grid grid-cols-2 md:flex md:space-x-4 gap-4 md:gap-0 w-full md:w-auto">
            <button 
              onClick={handleDisabledClick}
              className="bg-gray-400 text-white px-6 md:px-6 py-4 md:py-3 rounded-lg text-sm md:text-sm font-medium cursor-not-allowed min-h-[48px] touch-manipulation"
              disabled
            >
              Add Task
            </button>
            <button 
              onClick={handleDisabledClick}
              className="bg-gray-400 text-white px-6 md:px-6 py-4 md:py-3 rounded-lg text-sm md:text-sm font-medium cursor-not-allowed min-h-[48px] touch-manipulation"
              disabled
            >
              Add Goal
            </button>
            <button 
              onClick={handleDisabledClick}
              className="bg-gray-400 text-white px-6 md:px-6 py-4 md:py-3 rounded-lg text-sm md:text-sm font-medium cursor-not-allowed min-h-[48px] touch-manipulation"
              disabled
            >
              Challenge
            </button>
            <button 
              onClick={handleAddChild}
              className="bg-primary-500 text-white px-6 md:px-6 py-4 md:py-3 rounded-lg text-sm md:text-sm font-medium hover:bg-primary-600 transition-colors min-h-[48px] touch-manipulation"
            >
              Add Child
            </button>
          </div>
          
          <button 
            onClick={() => router.push('/home')} 
            className="mt-6 md:mt-0 p-3 min-h-[48px] min-w-[48px] flex items-center justify-center touch-manipulation"
          >
            <Home className="w-8 h-8 text-primary-500" />
          </button>
        </div>
      </div>
    </div>
  );
}