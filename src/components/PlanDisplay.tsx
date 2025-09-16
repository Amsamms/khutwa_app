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
  // Extract structured data from GPT-5 response
  const extractStructuredData = (content: string) => {
    const data = {
      expectedReturn: 6, // Default fallback
      monthlyContribution: plan.monthlyContribution,
      totalExpected: parseInt(plan.goalAmount.replace(/[^0-9]/g, '')) || 500000,
      allocations: [] as Array<{name: string, value: number, color: string}>,
      projections: [] as Array<{year: number, amount: number, notes: string}>
    };

    // Extract DATA markers
    const dataRegex = /\[DATA:([^:]+):([^:]+):([^\]]+)\]/g;
    let match;
    while ((match = dataRegex.exec(content)) !== null) {
      const [, key, value, unit] = match;
      if (key === 'EXPECTED_RETURN') {
        data.expectedReturn = parseFloat(value) || 6;
      } else if (key === 'MONTHLY_CONTRIBUTION') {
        data.monthlyContribution = parseFloat(value.replace(/[^0-9]/g, '')) || data.monthlyContribution;
      } else if (key === 'TOTAL_EXPECTED') {
        data.totalExpected = parseFloat(value.replace(/[^0-9]/g, '')) || data.totalExpected;
      }
    }

    // Extract ALLOCATION markers
    const allocationRegex = /\[ALLOCATION:([^:]+):([^\]]+)\]/g;
    const colors = ['#4F46E5', '#10B981', '#06B6D4', '#F59E0B', '#EF4444', '#8B5CF6'];
    let colorIndex = 0;
    while ((match = allocationRegex.exec(content)) !== null) {
      const [, name, percentage] = match;
      data.allocations.push({
        name: name.replace(/_/g, ' '),
        value: parseFloat(percentage) || 0,
        color: colors[colorIndex % colors.length]
      });
      colorIndex++;
    }

    // Extract PROJECTION markers
    const projectionRegex = /\[PROJECTION:([^:]+):([^:]+):([^\]]*)\]/g;
    while ((match = projectionRegex.exec(content)) !== null) {
      const [, year, amount, notes] = match;
      data.projections.push({
        year: parseInt(year) || 0,
        amount: parseFloat(amount.replace(/[^0-9]/g, '')) || 0,
        notes: notes || ''
      });
    }

    return data;
  };

  // Parse content to extract sections with enhanced formatting
  const parseContent = (content: string) => {
    const sections = [];
    const lines = content.split('\n');
    let currentSection = { title: '', content: '', icon: CheckCircle, level: 1 };

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Skip data markers and allocation markers (already processed)
      if (trimmedLine.match(/\[DATA:|ALLOCATION:|PROJECTION:\]/)) {
        continue;
      }

      // Handle main headers (##)
      if (trimmedLine.startsWith('##') && !trimmedLine.startsWith('###')) {
        if (currentSection.title) sections.push(currentSection);
        const title = trimmedLine.replace(/^##\s*/, '').replace(/\*/g, '').trim();
        currentSection = {
          title,
          content: '',
          icon: getIconForSection(title),
          level: 1
        };
      }
      // Handle subheaders (###)
      else if (trimmedLine.startsWith('###')) {
        if (currentSection.title) sections.push(currentSection);
        const title = trimmedLine.replace(/^###\s*/, '').replace(/\*/g, '').trim();
        currentSection = {
          title,
          content: '',
          icon: getIconForSection(title),
          level: 2
        };
      }
      // Handle bold markers for sections
      else if (trimmedLine.includes('**') && trimmedLine.includes('.')) {
        if (currentSection.title) sections.push(currentSection);
        const title = trimmedLine.replace(/\*/g, '').replace(/^\d+\.\s*/, '').trim();
        currentSection = {
          title,
          content: '',
          icon: getIconForSection(title),
          level: 1
        };
      }
      // Add content lines
      else if (trimmedLine.length > 0 && currentSection.title) {
        // Format the content with proper markdown rendering
        let formattedLine = trimmedLine;

        // Handle bullet points
        if (formattedLine.startsWith('-')) {
          formattedLine = '• ' + formattedLine.substring(1).trim();
        }

        // Handle bold text (**text**)
        formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Handle numbers and percentages
        formattedLine = formattedLine.replace(/(\d+(?:,\d+)*)\s*(ريال|SAR|%)/g, '<span class="font-semibold text-blue-600">$1 $2</span>');

        currentSection.content += formattedLine + '\n';
      }
    }

    if (currentSection.title) sections.push(currentSection);
    return sections.filter(section => section.title && section.content.trim());
  };

  // Get appropriate icon for section based on content
  const getIconForSection = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('ملخص') || titleLower.includes('نظرة')) return Target;
    if (titleLower.includes('استراتيجية') || titleLower.includes('نمو')) return TrendingUp;
    if (titleLower.includes('مساهمة') || titleLower.includes('شهرية')) return DollarSign;
    if (titleLower.includes('مخاطر') || titleLower.includes('تحدي')) return AlertTriangle;
    if (titleLower.includes('زمن') || titleLower.includes('مدة')) return Calendar;
    if (titleLower.includes('تعليم') || titleLower.includes('تطوير')) return BookOpen;
    if (titleLower.includes('أداة') || titleLower.includes('قياس')) return BarChart3;
    if (titleLower.includes('بديل') || titleLower.includes('خيار')) return Lightbulb;
    return CheckCircle;
  };

  // Extract structured data from GPT-5 response
  const structuredData = extractStructuredData(plan.content);

  // Generate chart data using GPT-5 extracted data or fallback to calculations
  const generateSavingsData = () => {
    // If GPT-5 provided projections, use them
    if (structuredData.projections.length > 0) {
      const data = [{ period: 'البداية', amount: 0, target: 0 }];
      structuredData.projections.forEach(proj => {
        data.push({
          period: `السنة ${proj.year}`,
          amount: proj.amount,
          target: (proj.amount / structuredData.totalExpected) * 100
        });
      });
      return data;
    }

    // Fallback to calculated data using GPT-5's expected return rate
    const data = [];
    const monthlyAmount = structuredData.monthlyContribution;
    const totalMonths = plan.years * 12;
    const monthlyRate = structuredData.expectedReturn / 100 / 12; // Convert to monthly rate

    for (let i = 0; i <= totalMonths; i += 6) { // Every 6 months
      let totalSaved = 0;
      if (i > 0) {
        // Calculate compound growth using future value of annuity formula
        totalSaved = monthlyAmount * ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate);
      }
      const year = Math.floor(i / 12);

      data.push({
        period: i === 0 ? 'البداية' : `السنة ${year}`,
        amount: Math.round(totalSaved),
        target: (totalSaved / structuredData.totalExpected) * 100
      });
    }

    return data;
  };

  const getRiskAllocation = () => {
    // If GPT-5 provided allocation data, use it
    if (structuredData.allocations.length > 0) {
      return structuredData.allocations;
    }

    // Fallback to hardcoded allocations
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
  const riskAllocation = getRiskAllocation();
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
                    <p
                      key={pIndex}
                      className={`mb-4 text-justify ${section.level === 2 ? 'text-sm' : ''}`}
                      dangerouslySetInnerHTML={{ __html: paragraph.trim() }}
                    />
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

            // Use GPT-5 projection data if available, otherwise calculate
            let savedAmount = 0;
            const gptProjection = structuredData.projections.find(p => p.year === year);

            if (gptProjection) {
              savedAmount = gptProjection.amount;
            } else {
              // Calculate with compound growth using GPT-5's expected return rate
              const monthlyRate = structuredData.expectedReturn / 100 / 12; // Convert to monthly rate
              const months = year * 12;
              const compoundAmount = structuredData.monthlyContribution *
                ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
              savedAmount = Math.round(compoundAmount);
            }
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