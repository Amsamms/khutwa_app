'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Home, Plus } from 'lucide-react';

export default function AddChildPage() {
  const router = useRouter();
  const [childName, setChildName] = useState('');
  const [gender, setGender] = useState<'Girl' | 'Boy' | ''>('');
  const [age, setAge] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');

  const handleSaveChild = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!childName || !gender || !age) {
      alert('Please fill in all required fields');
      return;
    }

    // Save child data to localStorage
    const existingChildren = JSON.parse(localStorage.getItem('children') || '[]');
    const newChild = {
      id: Date.now().toString(),
      name: childName,
      gender,
      age: parseInt(age),
      goal: primaryGoal || 'No goal set',
      progress: 0,
      avatar: gender === 'Girl' ? '👧' : '👦'
    };
    
    existingChildren.push(newChild);
    localStorage.setItem('children', JSON.stringify(existingChildren));
    
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <Logo size="sm" showText={true} />
        <button onClick={() => router.push('/home')}>
          <Home className="w-8 h-8 text-primary-500" />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Page Title */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="bg-black rounded-full p-2">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-medium text-black">Add Child</h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSaveChild} className="space-y-6 max-w-2xl mx-auto">
          {/* Child Name */}
          <div className="space-y-2">
            <label className="text-base font-medium text-black">
              Child Name (required )
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full px-4 py-4 border-2 border-primary-400 rounded-lg focus:outline-none focus:border-primary-500 text-base"
              placeholder=""
              required
            />
          </div>

          {/* Gender */}
          <div className="space-y-4">
            <label className="text-base font-medium text-black">
              Gender (required )
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setGender('Girl')}
                className={`flex-1 py-4 px-6 rounded-lg text-base font-medium transition-colors ${
                  gender === 'Girl' 
                    ? 'bg-pink-200 text-black border-2 border-pink-300' 
                    : 'bg-pink-100 text-black border border-gray-300'
                }`}
              >
                Girl
              </button>
              <button
                type="button"
                onClick={() => setGender('Boy')}
                className={`flex-1 py-4 px-6 rounded-lg text-base font-medium transition-colors ${
                  gender === 'Boy' 
                    ? 'bg-blue-200 text-black border-2 border-blue-300' 
                    : 'bg-blue-100 text-black border border-gray-300'
                }`}
              >
                Boy
              </button>
            </div>
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label className="text-base font-medium text-black">
              Age (required )
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-32 px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 text-base"
              placeholder=""
              required
              min="1"
              max="18"
            />
          </div>

          {/* Primary Goal */}
          <div className="space-y-2">
            <label className="text-base font-medium text-black">
              primary Goal (Optional )
            </label>
            <textarea
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 text-base resize-none"
              rows={3}
              placeholder=""
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className="bg-primary-500 text-white px-12 py-4 rounded-lg text-base font-medium hover:bg-primary-600 transition-colors"
            >
              Save Child
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}