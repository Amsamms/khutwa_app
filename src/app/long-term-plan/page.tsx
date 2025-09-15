'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Home } from 'lucide-react';

export default function LongTermPlanPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    goalAmount: '',
    age: '',
    targetAge: '',
    gender: '',
    riskLevel: '' as 'LOW' | 'MEDIUM' | 'HIGH' | ''
  });
  const [loading, setLoading] = useState(false);

  // Calculate timeline details
  const currentAge = parseInt(formData.age) || 18;
  const targetAge = parseInt(formData.targetAge) || 25;
  const years = targetAge - currentAge;
  const months = years * 12;
  
  // Calculate monthly contribution based on user input
  const totalGoalAmount = parseInt(formData.goalAmount.replace(/[^0-9]/g, '')) || 500000;
  const monthlyContribution = months > 0 ? Math.round(totalGoalAmount / months) : 0;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.goal || !formData.goalAmount || !formData.age || !formData.targetAge || !formData.gender || !formData.riskLevel) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // Call API to generate plan
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          monthlyContribution,
          years
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate plan');
      
      const data = await response.json();
      
      // Store the plan and redirect to view
      localStorage.setItem('generatedPlan', JSON.stringify(data));
      router.push('/plan-view');
      
    } catch (error) {
      console.error('Error generating plan:', error);
      alert('Failed to generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            </div>
            <h2 className="text-xl font-semibold text-black mb-2">Generating Your Financial Plan</h2>
            <p className="text-gray-600 mb-4">Please don't leave this page. This process may take up to 60 seconds.</p>
            <div className="text-sm text-primary-600">
              ✨ Creating personalized recommendations...
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <Logo size="sm" showText={true} />
        <button onClick={() => router.push('/home')} disabled={loading}>
          <Home className="w-8 h-8 text-primary-500" />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Page Title - Mobile Optimized */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl md:text-2xl font-medium text-black">Long - Term Plan</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleGeneratePlan} className={`space-y-6 max-w-4xl mx-auto ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Name - Mobile Optimized */}
          <div className="space-y-3">
            <label className="block text-base font-medium text-black">Name (required )</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base min-h-[48px] touch-manipulation"
              required
            />
          </div>

          {/* Goal - Mobile Optimized */}
          <div className="space-y-3">
            <label className="block text-base font-medium text-black">Goal</label>
            <input
              type="text"
              value={formData.goal}
              onChange={(e) => handleInputChange('goal', e.target.value)}
              className="w-full px-4 py-5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base min-h-[48px] touch-manipulation"
              required
            />
          </div>

          {/* Goal Amount - Mobile Optimized */}
          <div className="space-y-3">
            <label className="block text-base font-medium text-black">Goal Amount (SAR)</label>
            <input
              type="text"
              value={formData.goalAmount}
              onChange={(e) => {
                // Format number with commas
                const value = e.target.value.replace(/[^0-9]/g, '');
                const formattedValue = value ? parseInt(value).toLocaleString() + ' SAR' : '';
                handleInputChange('goalAmount', formattedValue);
              }}
              placeholder="60,000 SAR"
              className="w-full px-4 py-5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base min-h-[48px] touch-manipulation"
              required
            />
          </div>

          {/* Age, Target Age, Gender Row - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="block text-base font-medium text-black">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full px-4 py-5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base min-h-[48px] touch-manipulation"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="block text-base font-medium text-black">Target Age</label>
              <input
                type="number"
                value={formData.targetAge}
                onChange={(e) => handleInputChange('targetAge', e.target.value)}
                className="w-full px-4 py-5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base min-h-[48px] touch-manipulation"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="block text-base font-medium text-black">Gender</label>
              <input
                type="text"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-4 py-5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base min-h-[48px] touch-manipulation"
                placeholder="Boy/Girl"
                required
              />
            </div>
          </div>

          {/* Risk Level */}
          <div className="space-y-4">
            <label className="text-base font-medium text-black">Risk Level</label>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
              {['LOW', 'MEDIUM', 'HIGH'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleInputChange('riskLevel', level)}
                  className={`flex-1 py-4 px-6 border rounded-lg text-base font-medium transition-colors ${
                    formData.riskLevel === level 
                      ? 'border-primary-500 bg-primary-50 text-primary-700' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Plan Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}