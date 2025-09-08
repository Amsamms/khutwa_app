'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Home, Download } from 'lucide-react';

interface GeneratedPlan {
  name: string;
  goal: string;
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
      // Import html2pdf.js for better Arabic support
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Create a temporary div with the plan content
      const element = document.createElement('div');
      element.style.cssText = `
        font-family: 'Arial', sans-serif;
        direction: rtl;
        text-align: right;
        padding: 20px;
        background: white;
        color: black;
        line-height: 1.6;
      `;
      
      // Build HTML content
      element.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5; font-size: 24px; margin-bottom: 10px;">خطة مالية مخصصة</h1>
          <h2 style="font-size: 18px; color: #666;">${plan.name} - ${plan.goal}</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; direction: rtl;">
          <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
            <strong>الاسم:</strong> ${plan.name}
          </div>
          <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
            <strong>الهدف:</strong> ${plan.goal}
          </div>
          <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
            <strong>العمر الحالي:</strong> ${plan.age} سنة
          </div>
          <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
            <strong>العمر المستهدف:</strong> ${plan.targetAge} سنة
          </div>
          <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
            <strong>مستوى المخاطرة:</strong> ${plan.riskLevel}
          </div>
          <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
            <strong>المساهمة الشهرية:</strong> ${plan.monthlyContribution.toLocaleString()} ريال
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #4F46E5; border-bottom: 2px solid #4F46E5; padding-bottom: 5px;">تفاصيل الخطة المالية</h3>
        </div>
        
        <div style="white-space: pre-line; line-height: 1.8;">
          ${plan.content.replace(/\*\*/g, '').replace(/###/g, '').replace(/##/g, '')}
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px;">
          <p>تم إنشاء هذه الخطة في ${new Date().toLocaleDateString('ar-SA')}</p>
          <p>خطة مالية من تطبيق خطوة - Khutwa Financial Planning</p>
        </div>
      `;
      
      // Configure options for PDF generation
      const options = {
        margin: 1,
        filename: `${plan.name}-Financial-Plan.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };
      
      // Generate and download PDF
      await html2pdf().set(options).from(element).save();
      
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
      <div className="p-6 max-w-4xl mx-auto">
        {/* Plan Header */}
        <div className="text-center mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold text-black mb-2">خطة مالية مخصصة</h1>
          <h2 className="text-xl text-gray-600 mb-4">{plan.name} - {plan.goal}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">العمر الحالي</div>
              <div>{plan.age} سنة</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">العمر المستهدف</div>
              <div>{plan.targetAge} سنة</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">مستوى المخاطرة</div>
              <div>{plan.riskLevel}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">المساهمة الشهرية</div>
              <div>{plan.monthlyContribution.toLocaleString()} ريال</div>
            </div>
          </div>
        </div>

        {/* Plan Content */}
        <div className="arabic prose max-w-none">
          <div 
            className="text-right leading-relaxed text-gray-800"
            style={{ fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}
            dangerouslySetInnerHTML={{ 
              __html: plan.content.replace(/\n/g, '<br/>') 
            }}
          />
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>تم إنشاء هذه الخطة في {new Date(plan.generatedAt).toLocaleDateString('ar-SA')}</p>
          <p className="mt-2">خطة مالية من تطبيق خطوة - Khutwa Financial Planning</p>
        </div>
      </div>
    </div>
  );
}