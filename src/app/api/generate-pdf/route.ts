import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();
    
    if (!plan) {
      return NextResponse.json(
        { error: 'Plan data is required' },
        { status: 400 }
      );
    }

    // Import jsPDF with Arabic support
    const { jsPDF } = await import('jspdf');
    
    // Create new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Add Arabic font support
    // We'll use a basic approach for now - Arabic text should be processed
    try {
      // If Arabic plugin is available, use it
      if (typeof (doc as any).processArabic === 'function') {
        (doc as any).setLanguage('ar');
      }
    } catch (e) {
      console.log('Arabic plugin not available, using basic text rendering');
    }
    
    // Add title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('خطة مالية مخصصة', 105, 20, { align: 'center' });
    
    // Add plan details
    doc.setFontSize(16);
    doc.text(`${plan.name} - ${plan.goal}`, 105, 35, { align: 'center' });
    
    // Add basic information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    let yPosition = 50;
    
    const addLine = (text: string) => {
      doc.text(text, 20, yPosition, { align: 'right', maxWidth: 170 });
      yPosition += 10;
    };
    
    addLine(`الاسم: ${plan.name}`);
    addLine(`الهدف: ${plan.goal}`);
    addLine(`العمر الحالي: ${plan.age} سنة`);
    addLine(`العمر المستهدف: ${plan.targetAge} سنة`);
    addLine(`مستوى المخاطرة: ${plan.riskLevel}`);
    addLine(`المساهمة الشهرية: ${plan.monthlyContribution.toLocaleString()} ريال`);
    
    yPosition += 10;
    
    // Add plan content
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    addLine('تفاصيل الخطة المالية:');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition += 5;
    
    // Process Arabic content and add to PDF
    if (plan.content) {
      const processedContent = plan.content
        .replace(/#+\s/g, '') // Remove markdown headers
        .split('\n')
        .filter((line: string) => line.trim().length > 0);
      
      processedContent.forEach((line: string) => {
        if (yPosition > 270) { // Add new page if needed
          doc.addPage();
          yPosition = 20;
        }
        
        const wrappedText = doc.splitTextToSize(line, 170);
        wrappedText.forEach((textLine: string) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(textLine, 200, yPosition, { align: 'right', maxWidth: 170 });
          yPosition += 6;
        });
        yPosition += 2;
      });
    }
    
    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text('خطة مالية من تطبيق خطوة - Khutwa Financial Planning', 105, 290, { align: 'center' });
      doc.text(`صفحة ${i} من ${pageCount}`, 20, 290);
    }
    
    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${plan.name}-Financial-Plan.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}