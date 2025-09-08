import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, goal, age, targetAge, gender, riskLevel, monthlyContribution, years } = body;

    // Construct Arabic prompt for financial planning
    const prompt = `
أنشئ خطة مالية مخصصة بناءً على هذه المدخلات:
الاسم: ${name}
الهدف: ${goal}
العمر الحالي: ${age}
العمر المستهدف: ${targetAge}
الجنس: ${gender}
مستوى المخاطرة: ${riskLevel}
المساهمة الشهرية المقترحة: ${monthlyContribution} ريال سعودي
العملة: SAR
الأفق الزمني: ${years} سنة

أريد أن تكون الخطة:
- مكتوبة بالعربية بشكل كامل
- على شكل أقسام واضحة ومنظمة
- تتضمن الأقسام التالية:
  1. ملخص تنفيذي
  2. الاستراتيجية المالية
  3. المساهمة الشهرية والتوقعات
  4. البدائل والخيارات
  5. نقاط المخاطرة والتحديات
  6. خطوات على المدى القريب (سنة واحدة)
  7. خطوات على المدى المتوسط (2-5 سنوات)
- جاهزة للتنسيق في PDF
- تتضمن أرقام وإحصائيات واقعية
- تأخذ في الاعتبار الاقتصاد السعودي والريال السعودي

يجب أن تكون الخطة شاملة ومفصلة ومهنية.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "أنت مستشار مالي خبير متخصص في التخطيط المالي للأطفال والأهداف طويلة المدى في المملكة العربية السعودية. قم بإنشاء خطط مالية شاملة ومهنية باللغة العربية."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const planContent = completion.choices[0]?.message?.content || '';

    // Return the generated plan
    return NextResponse.json({
      success: true,
      plan: {
        name,
        goal,
        age: parseInt(age),
        targetAge: parseInt(targetAge),
        gender,
        riskLevel,
        monthlyContribution,
        years,
        content: planContent,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error generating financial plan:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate financial plan' },
      { status: 500 }
    );
  }
}