import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register Arabic font (Note: In production, you'd need to provide the actual font file)
Font.register({
  family: 'NotoSansArabic',
  src: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;600;700&display=swap'
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f8fdf8',
    padding: 40,
    fontFamily: 'NotoSansArabic',
  },
  header: {
    backgroundColor: '#4F46E5',
    padding: 20,
    marginBottom: 30,
    borderRadius: 8,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  dateText: {
    position: 'absolute',
    top: 20,
    right: 20,
    color: 'white',
    fontSize: 12,
  },
  personalInfoSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    border: '1px solid #e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
    textAlign: 'right',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoItem: {
    flex: 1,
    textAlign: 'right',
  },
  infoLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 14,
    color: '#2d3748',
    fontWeight: 'bold',
  },
  contentSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    border: '1px solid #e0e0e0',
  },
  arabicText: {
    fontSize: 12,
    lineHeight: 1.8,
    color: '#2d3748',
    textAlign: 'right',
    marginBottom: 10,
  },
  progressContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    border: '1px solid #e0e0e0',
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressSubtext: {
    fontSize: 12,
    color: '#4F46E5',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#718096',
    borderTop: '1px solid #e0e0e0',
    paddingTop: 10,
  },
});

interface PlanData {
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

interface PDFDocumentProps {
  plan: PlanData;
}

export const FinancialPlanPDF: React.FC<PDFDocumentProps> = ({ plan }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.dateText}>{formatDate(plan.generatedAt)}</Text>
          <Text style={styles.headerText}>خطة {plan.name} المالية المخصصة</Text>
          <Text style={styles.subHeaderText}>{plan.goal}</Text>
        </View>

        {/* Personal Information Section */}
        <View style={styles.personalInfoSection}>
          <Text style={styles.sectionTitle}>بياناتك الشخصية</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>الاسم الكامل</Text>
              <Text style={styles.infoValue}>{plan.name}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>العمر</Text>
              <Text style={styles.infoValue}>{plan.age} سنة</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>العمر المستهدف</Text>
              <Text style={styles.infoValue}>{plan.targetAge} سنة</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>مستوى المخاطرة المفضل</Text>
              <Text style={styles.infoValue}>{plan.riskLevel}</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>الهدف</Text>
              <Text style={styles.infoValue}>{plan.goal}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>الأفق الزمني</Text>
              <Text style={styles.infoValue}>{plan.years} سنة</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>المساهمة الشهرية المقترحة</Text>
              <Text style={styles.infoValue}>{plan.monthlyContribution.toLocaleString()} ريال سعودي</Text>
            </View>
          </View>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>لديك أفضلية أكثر من 57% من المتدربين</Text>
          <Text style={styles.progressText}>للوصول إلى هدفك في غضون {plan.years} أشهر</Text>
          <Text style={styles.progressSubtext}>وفقاً للخطة المالية المخصصة</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          خطة مالية من تطبيق خطوة - Khutwa Financial Planning {'\n'}
          تم إنشاء هذه الخطة بواسطة الذكاء الاصطناعي وتحتاج لمراجعة مستشار مالي معتمد
        </Text>
      </Page>

      {/* Second Page - Plan Content */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>تفاصيل الخطة المالية</Text>
          
          {/* Split content into paragraphs and render */}
          {plan.content.split('\n\n').map((paragraph, index) => (
            <Text key={index} style={styles.arabicText}>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          خطة مالية من تطبيق خطوة - Khutwa Financial Planning {'\n'}
          الصفحة 2 من 2
        </Text>
      </Page>
    </Document>
  );
};