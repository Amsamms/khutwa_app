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

      // Add temporary PDF-specific styles directly to the original element
      const pdfStyles = document.createElement('style');
      pdfStyles.id = 'temp-pdf-styles';
      pdfStyles.textContent = `
        /* Temporary PDF-specific styles for page break control */
        #plan-display-content p {
          page-break-inside: avoid !important;
          orphans: 3 !important;
          widows: 3 !important;
          line-height: 1.6 !important;
          margin-bottom: 10px !important;
        }

        #plan-display-content h1,
        #plan-display-content h2,
        #plan-display-content h3 {
          page-break-after: avoid !important;
          page-break-inside: avoid !important;
          margin-top: 20px !important;
          margin-bottom: 10px !important;
        }

        /* Keep charts and visual elements together */
        #plan-display-content .recharts-wrapper,
        #plan-display-content [class*="chart"],
        #plan-display-content [class*="Card"] {
          page-break-inside: avoid !important;
          margin: 15px 0 !important;
        }

        /* Arabic text specific controls */
        #plan-display-content div:has(p) {
          page-break-inside: avoid !important;
        }

        /* Section containers */
        #plan-display-content > div {
          page-break-inside: avoid !important;
          margin-bottom: 20px !important;
        }

        /* Force page breaks for major sections */
        #plan-display-content h2:nth-of-type(4n) {
          page-break-before: always !important;
          padding-top: 20px !important;
        }
      `;

      // Add styles temporarily
      document.head.appendChild(pdfStyles);

      // Enhanced PDF options with better page break handling
      const options = {
        margin: 0.5,
        filename: `${plan.name}-Financial-Plan.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: '#ffffff',
          logging: false,
          allowTaint: true
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: 'css',
          avoid: 'p, h1, h2, h3, .recharts-wrapper'
        }
      };

      // Generate and download PDF
      await html2pdf().set(options).from(planElement).save();

      // Clean up: remove temporary styles
      const tempStyles = document.getElementById('temp-pdf-styles');
      if (tempStyles) {
        document.head.removeChild(tempStyles);
      }

    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');

      // Clean up on error
      const tempStyles = document.getElementById('temp-pdf-styles');
      if (tempStyles) {
        document.head.removeChild(tempStyles);
      }
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