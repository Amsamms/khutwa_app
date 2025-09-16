'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import {
  TrendingUp,
  Target,
  DollarSign,
  Calendar,
  AlertTriangle,
  BookOpen,
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Shield,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

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

interface PlanDisplayProps {
  plan: GeneratedPlan;
}

// Color palette for charts
const COLORS = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan }) => {
  // Parse content to extract sections
  const parseContent = (content: string) => {
    const sections = [];
    const lines = content.split('\n');
    let currentSection = { title: '', content: '', icon: CheckCircle };

    for (const line of lines) {
      if (line.includes('**') && (line.includes('الملخص') || line.includes('ملخص'))) {
        if (currentSection.title) sections.push(currentSection);
        currentSection = { title: line.replace(/\*/g, '').trim(), content: '', icon: Target };
      } else if (line.includes('**') && (line.includes('استراتيجية') || line.includes('الاستراتيجية'))) {
        if (currentSection.title) sections.push(currentSection);
        currentSection = { title: line.replace(/\*/g, '').trim(), content: '', icon: TrendingUp };
      } else if (line.includes('**') && (line.includes('مساهمة') || line.includes('المساهمة'))) {
        if (currentSection.title) sections.push(currentSection);
        currentSection = { title: line.replace(/\*/g, '').trim(), content: '', icon: DollarSign };
      } else if (line.includes('**') && (line.includes('مخاطر') || line.includes('المخاطر'))) {
        if (currentSection.title) sections.push(currentSection);
        currentSection = { title: line.replace(/\*/g, '').trim(), content: '', icon: AlertTriangle };
      } else if (line.includes('**') && (line.includes('زمنية') || line.includes('الزمنية'))) {
        if (currentSection.title) sections.push(currentSection);
        currentSection = { title: line.replace(/\*/g, '').trim(), content: '', icon: Calendar };
      } else if (line.includes('**') && (line.includes('تعليم') || line.includes('التعليم'))) {
        if (currentSection.title) sections.push(currentSection);
        currentSection = { title: line.replace(/\*/g, '').trim(), content: '', icon: BookOpen };
      } else if (line.includes('**') && (line.includes('أدوات') || line.includes('الأدوات'))) {
        if (currentSection.title) sections.push(currentSection);
        currentSection = { title: line.replace(/\*/g, '').trim(), content: '', icon: BarChart3 };
      } else if (line.includes('**') && (line.includes('بديل') || line.includes('البدائل'))) {
        if (currentSection.title) sections.push(currentSection);
        currentSection = { title: line.replace(/\*/g, '').trim(), content: '', icon: Lightbulb };
      } else if (line.includes('**') && line.trim().length > 0) {
        if (currentSection.title) sections.push(currentSection);
        currentSection = { title: line.replace(/\*/g, '').trim(), content: '', icon: CheckCircle };
      } else if (line.trim().length > 0) {
        currentSection.content += line.trim() + '\n';
      }
    }

    if (currentSection.title) sections.push(currentSection);
    return sections;
  };

  // Generate chart data with compound growth
  const generateSavingsData = () => {
    const data = [];
    const monthlyAmount = plan.monthlyContribution;
    const totalMonths = plan.years * 12;
    const monthlyRate = 0.06 / 12; // 6% annual return = 0.5% monthly

    for (let i = 0; i <= totalMonths; i += 6) { // Every 6 months
      let totalSaved = 0;
      if (i > 0) {
        // Calculate compound growth using future value of annuity formula
        totalSaved = monthlyAmount * ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate);
      }
      const year = Math.floor(i / 12);
      const targetGoalAmount = parseInt(plan.goalAmount.replace(/[^0-9]/g, '')) || 500000;

      data.push({
        period: i === 0 ? 'البداية' : `السنة ${year}`,
        amount: Math.round(totalSaved),
        target: (totalSaved / targetGoalAmount) * 100
      });
    }

    return data;
  };

  const generateRiskAllocation = () => {
    const allocations = {
      'LOW': [
        { name: 'سندات حكومية', value: 40, color: '#10B981' },
        { name: 'ودائع بنكية', value: 35, color: '#06B6D4' },
        { name: 'صناديق مرابحة', value: 20, color: '#4F46E5' },
        { name: 'أسهم محافظة', value: 5, color: '#F59E0B' }
      ],
      'MEDIUM': [
        { name: 'صناديق استثمارية', value: 35, color: '#4F46E5' },
        { name: 'أسهم شركات كبرى', value: 30, color: '#10B981' },
        { name: 'سندات', value: 25, color: '#06B6D4' },
        { name: 'عقارات', value: 10, color: '#F59E0B' }
      ],
      'HIGH': [
        { name: 'أسهم نمو', value: 45, color: '#EF4444' },
        { name: 'صناديق متخصصة', value: 25, color: '#4F46E5' },
        { name: 'استثمارات بديلة', value: 20, color: '#8B5CF6' },
        { name: 'نقد طوارئ', value: 10, color: '#10B981' }
      ]
    };

    return allocations[plan.riskLevel as keyof typeof allocations] || allocations['MEDIUM'];
  };

  const savingsData = generateSavingsData();
  const riskAllocation = generateRiskAllocation();
  const sections = parseContent(plan.content);

  return (
    <div className="space-y-8" dir="rtl">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm opacity-80">الهدف المالي</h3>
              <p className="text-2xl font-bold">{plan.goalAmount}</p>
            </div>
            <Target className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm opacity-80">المساهمة الشهرية</h3>
              <p className="text-2xl font-bold">{plan.monthlyContribution.toLocaleString()} ريال</p>
            </div>
            <DollarSign className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm opacity-80">المدة الزمنية</h3>
              <p className="text-2xl font-bold">{plan.years} سنة</p>
            </div>
            <Calendar className="w-8 h-8 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm opacity-80">مستوى المخاطرة</h3>
              <p className="text-2xl font-bold">{plan.riskLevel}</p>
            </div>
            <Shield className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Savings Growth Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-blue-500 ml-3" />
          <h2 className="text-xl font-bold text-gray-800">نمو المدخرات عبر الزمن</h2>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}ك ريال`} />
              <Tooltip
                formatter={(value) => [`${Number(value).toLocaleString()} ريال`, 'المبلغ المدخر']}
                labelFormatter={(label) => `الفترة: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#4F46E5"
                fill="url(#colorAmount)"
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Allocation Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex items-center mb-6">
          <PieChartIcon className="w-6 h-6 text-green-500 ml-3" />
          <h2 className="text-xl font-bold text-gray-800">توزيع الاستثمارات المقترح</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskAllocation}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {riskAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {riskAllocation.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full ml-3"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-lg font-bold text-gray-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Content Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-lg ml-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 leading-tight">{section.title}</h2>
              </div>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {section.content.split('\n').map((paragraph, pIndex) => (
                  paragraph.trim() && (
                    <p key={pIndex} className="mb-4 text-justify">
                      {paragraph.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline Visualization */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border">
        <div className="flex items-center mb-6">
          <Calendar className="w-6 h-6 text-blue-500 ml-3" />
          <h2 className="text-xl font-bold text-gray-800">الخط الزمني للخطة</h2>
        </div>
        <div className="relative">
          <div className="absolute right-4 top-8 bottom-8 w-0.5 bg-blue-300"></div>
          {Array.from({ length: plan.years }, (_, i) => {
            const year = i + 1;
            // Calculate with compound growth (6% annual return for balanced portfolio)
            const monthlyRate = 0.06 / 12; // 6% annual = 0.5% monthly
            const months = year * 12;
            const compoundAmount = plan.monthlyContribution *
              ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
            const savedAmount = Math.round(compoundAmount);
            return (
              <div key={year} className="relative flex items-center mb-8">
                <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ml-6">
                  {year}
                </div>
                <div className="bg-white p-4 rounded-lg shadow border flex-1">
                  <h3 className="font-bold text-gray-800">السنة {year}</h3>
                  <p className="text-gray-600">إجمالي المدخرات: {savedAmount.toLocaleString()} ريال</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(year / plan.years) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};