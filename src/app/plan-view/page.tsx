'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { PlanDisplay } from '@/components/PlanDisplay';
import { Home, Download } from 'lucide-react';

interface GeneratedPlan {
  name: string;
  goal: string;
  goalAmount: string;
  age: number;
  targetAge: number;
  gender: string;
  riskLevel: string;
  monthlyContribution: number;
  years: number;
  content: string;
  generatedAt: string;
}

export default function PlanViewPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem('generatedPlan');
    if (savedPlan) {
      try {
        const planData = JSON.parse(savedPlan);
        setPlan(planData.plan);
      } catch (error) {
        console.error('Error parsing plan data:', error);
        router.push('/home');
      }
    } else {
      router.push('/home');
    }
  }, [router]);

  const handleDownloadPDF = async () => {
    if (!plan) return;

    setLoading(true);
    try {
      // Get the formatted plan element
      const planElement = document.getElementById('plan-display-content');
      if (!planElement) {
        throw new Error('Plan content not found');
      }

      // Import html2pdf.js for better Arabic support
      const html2pdf = (await import('html2pdf.js')).default;

      // Configure options for PDF generation
      const options = {
        margin: 0.5,
        filename: `${plan.name}-Financial-Plan.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: '#ffffff'
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'portrait'
        }
      };

      // Generate and download PDF with the beautiful formatted content
      await html2pdf().set(options).from(planElement).save();

    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <Logo size="sm" showText={true} />
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDownloadPDF}
            disabled={loading}
            className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{loading ? 'Generating...' : 'Download PDF'}</span>
          </button>
          <button onClick={() => router.push('/home')}>
            <Home className="w-8 h-8 text-primary-500" />
          </button>
        </div>
      </div>

      {/* Plan Content */}
      <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
        {/* Plan Header */}
        <div className="text-center mb-8 bg-white p-6 rounded-xl shadow-lg border" dir="rtl">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📊 خطة مالية مخصصة</h1>
          <h2 className="text-2xl text-blue-600 mb-4">{plan.name} - {plan.goal}</h2>
          <p className="text-gray-600">تم إنشاء هذه الخطة في {new Date(plan.generatedAt).toLocaleDateString('ar-SA')}</p>
        </div>

        {/* Beautiful Plan Display */}
        <div id="plan-display-content" className="bg-gray-50">
          <PlanDisplay plan={plan} />
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="text-sm text-gray-500" dir="rtl">
              <p className="text-lg font-semibold text-gray-700 mb-2">🎯 خطة مالية من تطبيق خطوة</p>
              <p>Khutwa Financial Planning - تطبيق التخطيط المالي الذكي</p>
              <p className="mt-2 text-blue-600">حيث التخطيط لسنوات يتم في دقائق</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}