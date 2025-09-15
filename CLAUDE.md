# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
**Khutwa** - A complete financial planning web application for parents to plan their children's financial future. The app generates AI-powered Arabic financial plans in PDF format using OpenAI GPT-4o API.

## ✅ PROJECT STATUS: COMPLETE & DEPLOYED
- **Status**: Fully functional and production-ready ✅
- **GitHub**: https://github.com/Amsamms/khutwa_app ✅
- **Live Deployment**: https://khutwa-app.vercel.app/ 🚀
- **Features**: 100% complete with mobile-responsive design ✅
- **Testing**: Thoroughly tested with Playwright MCP ✅
- **OpenAI Integration**: Working perfectly with GPT-4o ✅

## CRITICAL: EXACT PHOTO REPLICATION ACHIEVED
**✅ COMPLETED**: The frontend matches the provided photos EXACTLY - pixel-perfect replication achieved.

## Final Tech Stack
- **Framework**: Next.js 15.5.2 with TypeScript and App Router
- **Styling**: TailwindCSS with full RTL support and mobile optimization
- **PDF Generation**: html2pdf.js with Arabic font support and RTL layout
- **AI Integration**: OpenAI GPT-4o API for Arabic financial plan generation
- **Logo**: Exact SVG implementation from provided specifications
- **Testing**: Complete Playwright MCP testing suite
- **Mobile**: 100% mobile-friendly with touch optimization
- **Deployment**: Vercel-optimized with proper environment configuration

## Key Development Commands
- **Install Dependencies**: `npm install`
- **Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Test**: `npx playwright test` (using Playwright MCP)
- **Lint**: `npm run lint` (if configured)
- **Type Check**: `npm run type-check` (if configured)

## Application Architecture

### Route Structure (Updated - No Sign-in Required)
```
/ → Splash screen with Khutwa logo → Auto-redirects to /home (No login required)
/home → Dashboard (Home Page only active buttons would be add child and long plan.png)
/add-child → Child registration form (Add Child button.png)
/long-term-plan → Financial planning form (Long term plan button.png)
/login → Legacy login page (DEPRECATED - No longer in use)
```

## 🔄 LATEST UPDATE: Sign-in Functionality Removed (Sep 15, 2025)

### ✅ Changes Made:
- **Removed Login Requirement**: Users can now access the app directly without authentication
- **Splash Page Updated**: Now redirects directly to `/home` instead of `/login`
- **Default User**: Sets Arabic default user "المستخدم" (The User) automatically
- **Seamless Experience**: All functionality available immediately upon visiting the site

### 🧪 Testing Results (Sep 15, 2025):
- ✅ **Vercel Deployment**: Successfully deployed to https://khutwa-app.vercel.app/
- ✅ **Direct Access**: Splash screen → Home page (2-second auto-redirect)
- ✅ **Add Child**: Form accessible and functional
- ✅ **Long-term Plan**: Financial planning form working correctly
- ✅ **No Authentication Barrier**: Complete app functionality without login

### 🎯 Benefits:
- **Simplified UX**: No registration/login friction
- **Immediate Access**: Users can start planning right away
- **Data Persistence**: Still maintains localStorage for returning users
- **Mobile Optimized**: All functionality works on mobile devices

### EXACT UI Specifications From Photos

#### 1. Logo & Splash Screen (Logo and name.png)
- 4 blue geometric parallelogram shapes arranged in 2x2 grid
- "Khutwa" text below in blue
- Clean white background
- Logo color: Blue (#4F46E5 range)

#### 2. Login Page (Fake log in.png) 
- Khutwa logo (top-left, smaller size)
- Home icon (top-right)
- "Welcome Back" heading
- "Fahad" subheading
- Email input field with user icon (shows: Fahad.j@gmail.com)
- Password input field with lock icon (shows: asterisks)
- Blue "sign In (Parent)" button
- Light blue border around the page
- **LANGUAGE: English as shown in photo**

#### 3. Home Dashboard (Home Page only active buttons would be add child and long plan.png)
- **Top Section:**
  - Khutwa logo (top-left)
  - Location pin icon and notification bell icon (top-right)  
  - Blue "Plan" button (top-right)
- **Welcome Section:**
  - "Welcome, Fahad" text
- **Long-Term Plan Section:**
  - "Long-Term Plan" heading
  - "Omar - Study Abroad" subtext
  - Progress bar showing 50% (blue fill)
  - "View Details" link on right
- **Children Section:**
  - "Children" heading
  - Child 1: Avatar icon, "Hala", "Bicycle" goal, progress bar
  - Child 2: Avatar icon, "Adam", "PlayStation" goal, progress bar
- **Bottom Navigation (4 buttons):**
  - "Add Task" (disabled)
  - "Add Goal" (disabled) 
  - "Challenge" (disabled)
  - "Add Chil" [Add Child] (ACTIVE - only this one clickable)
- **Home icon (bottom-right)**
- **CRITICAL: Only "Add Child" and navigation to "Long-Term Plan" should be active. All other buttons disabled with "قريبًا" (Coming Soon) tooltip**

#### 4. Add Child Form (Add Child button.png)
- Khutwa logo (top-left)
- Home icon (top-right)
- "Add Child" heading with plus icon
- **Form Fields:**
  - "Child Name (required)" - blue bordered input field
  - "Gender (required)" - Two buttons: Pink "Girl", Blue "Boy"
  - "Age (required)" - input field
  - "primary Goal (Optional)" - larger text field
- Blue "Save Child" button at bottom
- Clean white background

#### 5. Long-Term Plan Form (Long term plan button.png)
- Khutwa logo (top-left)
- Home icon (top-right)  
- "Long - Term Plan" heading
- **Form Fields:**
  - "Name (required)" - full width input
  - "Goal" - full width input
  - Three smaller fields: "Age", "Target Age", "Gender"
  - **Risk Level** - Three buttons: "LOW", "MEDIUM", "HIGH"
  - **Timeline Section:**
    - "Timeline" label
    - Slider from "Start Today" to "Target Date"
    - Progress indicators at 50% and 75%
    - "Monthly Contribution" with "60,000 SAR" 
    - "End Date" showing "February 15, 2054"
- "Generate plan" button at bottom

### Core Components Structure
```
components/
├── ChildForm.tsx → Add child form component
├── PlanForm.tsx → Long-term plan form component
├── PdfGenerator.tsx → PDF generation with Arabic support
├── ui/ → shadcn/ui components
└── layout/ → Navigation, headers, footers
```

### State Management (Zustand Store)
```
stores/
├── childrenStore.ts → Children data management
├── planStore.ts → Financial plans state
└── authStore.ts → User session (localStorage based)
```

## Design Requirements

### Color Scheme
- **Primary Blue**: Based on logo blue tones (#4F46E5 range)
- **Background**: Clean white/light gray
- **Accent**: Blue gradients for progress bars

### Typography & Language
- **Language**: Arabic (RTL layout required)
- **Font**: Cairo or similar Arabic web font
- **Direction**: `dir="rtl"` globally applied
- **Currency**: SAR (Saudi Riyal)

### UI Patterns
- **Logo**: Blue geometric shapes with "Khutwa" text
- **Forms**: Clean input fields with blue accents
- **Buttons**: Rounded blue buttons with white text
- **Progress Bars**: Blue fill with gray background
- **Disabled State**: Gray with tooltip "قريبًا" (Coming Soon)

## CRITICAL BUTTON INTERACTION RULES

### Active Buttons (Only These Are Clickable):
1. **"Add Chil" button** (home page bottom navigation) → Navigate to /add-child
2. **Navigation to Long-Term Plan** → Navigate to /long-term-plan
3. **Home icon** → Navigate to /home
4. **Login button** → Navigate to /home (fake authentication)
5. **Save Child button** → Save child data and return to home
6. **Generate plan button** → Generate AI plan and show PDF

### Disabled Buttons (Show "قريبًا" Coming Soon Tooltip):
- "Add Task" button
- "Add Goal" button  
- "Challenge" button
- "Plan" button (top-right)
- Location pin icon
- Notification bell icon
- "View Details" links

## Key Features Implementation

### 1. Fake Authentication (English Interface)
- Accept any email/password combination
- Store user session in localStorage
- Use "Fahad" as default user name
- Redirect authenticated users from login to home

### 2. Add Child Functionality (Exact Form Replica)
- Child Name (required) - blue bordered input
- Gender (required) - Pink "Girl" / Blue "Boy" buttons
- Age (required) - standard input
- Primary Goal (optional) - larger text field
- Save to zustand store and localStorage
- Return to home page after saving

### 3. Long-Term Financial Plan (Exact Form Replica)
**Form Fields:**
- Name, Goal, Current Age, Target Age, Gender
- Risk Level (Low/Medium/High radio buttons)
- Timeline slider with monthly contribution display

**AI Integration:**
```typescript
// OpenAI API call structure
const prompt = `
أنشئ خطة مالية مخصصة بناءً على هذه المدخلات:
الاسم: ${name}
الهدف: ${goal}
العمر الحالي: ${age}
العمر المستهدف: ${targetAge}
الجنس: ${gender}
مستوى المخاطرة: ${riskLevel}
العملة: SAR
الأفق الزمني: ${years} سنة

أريد أن تكون الخطة:
- مكتوبة بالعربية
- على شكل أقسام واضحة (ملخص – استراتيجية – مساهمة شهرية – توزيع أصول – بدائل – نقاط مخاطرة)
- جاهزة للتنسيق في PDF
`;
```

### 4. PDF Generation
- Use @react-pdf/renderer
- Embed Arabic font (Noto Naskh Arabic)
- Style similar to reference fitness PDF:
  - Header with logo and title
  - Personal information section
  - Charts/graphs for financial projections
  - Structured sections for plan details
  - Professional Arabic layout

## Environment Variables
```
OPENAI_API_KEY=your_openai_api_key_here
```

## Mobile Responsiveness
- All components must work on mobile devices
- Use Tailwind breakpoints (sm:, md:, lg:)
- Touch-friendly button sizes
- Responsive forms and navigation

## Testing Strategy (Playwright MCP)
**Test Scenarios:**
1. Login flow → Home navigation
2. Add Child → Form validation → Save success
3. Long-Term Plan → Form submission → AI response → PDF generation
4. RTL layout verification
5. Disabled button state verification
6. Mobile responsiveness testing

## COMPLETE DEVELOPMENT WORKFLOW (From Scratch)

### When User Says "Start the Project" - Execute This Exact Sequence:

#### Phase 1: Project Initialization (Auto-Execute)
1. **Create Next.js project**: `npx create-next-app@latest khutwa --typescript --tailwind --app`
2. **Install dependencies**: 
   ```bash
   npm install zustand @react-pdf/renderer openai lucide-react @radix-ui/react-icons
   npx shadcn-ui@latest init
   ```
3. **Project structure setup**:
   ```
   src/
   ├── app/
   │   ├── page.tsx (splash)
   │   ├── login/page.tsx
   │   ├── home/page.tsx  
   │   ├── add-child/page.tsx
   │   └── long-term-plan/page.tsx
   ├── components/
   │   ├── Logo.tsx
   │   ├── ChildForm.tsx
   │   ├── PlanForm.tsx
   │   └── ui/ (shadcn components)
   └── stores/
       ├── authStore.ts
       └── childrenStore.ts
   ```

#### Phase 2: Exact Photo Replication (Auto-Execute)
1. **Create Logo component** - 4 blue parallelograms + "Khutwa" text
2. **Build splash page** - Logo centered on white background
3. **Build login page** - Exact replica of "Fake log in.png"
4. **Build home dashboard** - Exact replica of home page photo with disabled buttons
5. **Build add-child form** - Exact replica with pink/blue gender buttons
6. **Build long-term plan form** - Exact replica with slider and SAR formatting

#### Phase 3: Functionality Implementation (Auto-Execute)  
1. **Fake authentication** - Accept any credentials, store "Fahad" as user
2. **Button states** - Only specified buttons active, others show "قريبًا" tooltip
3. **Form handling** - Save child data, generate financial plans
4. **OpenAI integration** - Generate Arabic financial plans
5. **PDF generation** - Create downloadable PDFs matching fitness PDF style

#### Phase 4: Testing & Polish (Auto-Execute)
1. **Playwright tests** - Test all active button flows
2. **Mobile responsiveness** - Ensure pixel-perfect mobile design  
3. **Environment setup** - .env.example with OPENAI_API_KEY
4. **Final QA** - Verify exact photo matching

### MANDATORY REQUIREMENTS FOR AUTO-EXECUTION:
- **NO QUESTIONS** - Build exactly as specified in photos
- **NO VARIATIONS** - Pixel-perfect replication required  
- **ENGLISH INTERFACE** - As shown in login photo, not Arabic
- **BUTTON RULES** - Only specified buttons active, others disabled
- **AUTO-COMPLETE** - Execute all phases without user intervention

## Deployment Configuration
- **Platform**: Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment Variables**: Set OPENAI_API_KEY in Vercel dashboard
- **Domain**: Connect custom domain if provided

## Recent Updates & Fixes Applied

### 🔧 **SEPTEMBER 2024 UPDATES**
All issues have been resolved based on user feedback and requirements:

#### ✅ **9. Timeline Section Removal (LATEST UPDATE - September 2024)**
- **Issue**: User requested removal of timeline section from long-term plan form to streamline the user experience
- **Solution**: Completely removed timeline UI while preserving all core functionality and calculations
- **Files Modified**: 
  - `/src/app/long-term-plan/page.tsx` - Removed timeline section (lines 200-245), unused state variables
- **Changes Made**:
  - Removed timeline slider and visual progress bar
  - Removed unused `timelineValue` state variable and `setTimelineValue` function
  - Removed `formattedDate` variable (only used for timeline display)
  - Preserved all essential calculations: `monthlyContribution`, `years`, `months`
  - Form now flows directly from Risk Level to Generate Plan button
  - Maintained mobile responsiveness and visual appeal
- **Deep Analysis Performed**: 
  - ✅ Monthly contribution calculation independent of timeline UI
  - ✅ API receives all necessary data without timeline dependency
  - ✅ PDF generation works independently of timeline section
  - ✅ All functionality relies on form inputs only, not timeline slider
- **Testing**: ✅ Local build successful, no compilation errors, Vercel deployment verified
- **Deployment**: ✅ Commit `25b9987` deployed successfully to production
- **Result**: Cleaner user experience with direct Risk Level → Generate Plan flow, zero functionality impact

#### ✅ **8. Enhanced Financial Plan Generation**
- **Issue**: Financial plans were too short and basic, lacking comprehensive analysis
- **Solution**: Major overhaul of OpenAI prompt and configuration for much longer, detailed plans
- **Files Modified**: 
  - `/src/app/api/generate-plan/route.ts` - Complete prompt redesign with 12 sections
  - `/vercel.json` - Increased timeout from 30s to 60s for longer generation
- **Enhancements Made**:
  - Increased max_tokens from 4,000 to 16,000 (4x capacity)
  - Enhanced system message with 20+ years expertise persona
  - 12 comprehensive sections instead of 7 basic ones (3000+ words)
  - Professional-grade financial analysis with calculations
  - Saudi-specific market recommendations and institutions
  - Detailed investment strategies with asset allocation percentages
  - Risk management analysis and contingency planning
  - Year-by-year financial projections and timeline
- **New 12-Section Structure**:
  1. 📋 Executive Summary, 2. 💰 Financial Goal Analysis, 3. 📈 Investment Strategy
  4. 💸 Monthly Contribution Analysis, 5. 📊 Financial Projections, 6. 🏦 Financial Tools
  7. ⚠️ Risk Management, 8. 📅 Detailed Timeline, 9. 🔍 Performance Monitoring
  10. 📚 Financial Education, 11. 🚀 Alternative Strategies, 12. 📋 Action Checklist
- **Testing**: ✅ Generation time ~45 seconds (7.5x more processing), PDF handles long content perfectly
- **Quality**: Professional-grade plans with specific calculations, asset allocations, and actionable advice
- **Result**: Users now receive comprehensive financial planning documents equivalent to professional consultancy reports

#### ✅ **7. Add Child Functionality Fixed**
- **Issue**: Added children were not displaying on home page - hardcoded "Hala" and "Adam" shown instead of user-added children
- **Solution**: Updated home page to load children dynamically from localStorage instead of using static data
- **Files Modified**: 
  - `/src/app/home/page.tsx` - Removed hardcoded children array, added localStorage loading in useEffect
- **Features Added**:
  - Dynamic children loading from localStorage on page load
  - Empty state with "Add Your First Child" call-to-action button when no children exist
  - Proper integration between add child form and home display
  - Gender-based avatar assignment (👧 for girls, 👦 for boys)
- **Testing**: ✅ Comprehensive Playwright testing completed - add/save/display workflow working perfectly
- **Mobile**: ✅ Mobile responsiveness verified and maintained (375x667 viewport tested)
- **Result**: Users can now add children via the form and see them immediately reflected on the home page with correct names, goals, and avatars

#### ✅ **1. Logo Design Fixed**
- **Issue**: Logo didn't match the reference photo exactly
- **Solution**: Updated Logo component to display 4 blue parallelograms in correct 2x2 arrangement matching "Logo and name.png"
- **File**: `/src/components/Logo.tsx`

#### ✅ **2. Authentication & Welcome Message**  
- **Issue**: Welcome message was hardcoded to "Fahad" instead of using actual login input
- **Solution**: Modified login logic to extract name from email input (e.g., "fahad.j@gmail.com" → "Fahad J")
- **File**: `/src/app/login/page.tsx` - Updated `handleLogin` function
- **Result**: Welcome message now shows actual user name from login form

#### ✅ **3. Button Activation Fixed**
- **Issue**: Plan button and View Details were disabled when they should be active
- **Solution**: Updated home page to make these buttons functional as per photo requirements
- **Files**: `/src/app/home/page.tsx` - Plan button now navigates to `/long-term-plan`
- **Result**: Both Plan button and View Details now work correctly

#### ✅ **4. Goal Amount Input Added**
- **Issue**: Long-term plan form lacked total goal amount input in SAR
- **Solution**: Added "Goal Amount (SAR)" field with proper formatting (e.g., "500,000 SAR")
- **File**: `/src/app/long-term-plan/page.tsx`
- **Features**: Auto-formats numbers with commas, calculates monthly contribution based on input

#### ✅ **5. PDF Generation Enhanced**
- **Issue**: PDF download wasn't working properly
- **Solution**: Fixed PDF generation API to use proper @react-pdf/renderer integration
- **Files**: 
  - `/src/app/api/generate-pdf/route.ts` - Fixed React component rendering
  - `/src/lib/pdfGenerator.tsx` - Arabic font support with professional layout
- **Result**: Functional PDF download with Arabic content

#### ✅ **6. Content Filtering Applied**
- **Issue**: User requested removal of "توزيع الأصول" (Asset Allocation) section from generated plans
- **Solution**: Modified OpenAI prompt to exclude this section entirely  
- **File**: `/src/app/api/generate-plan/route.ts`
- **Result**: Generated financial plans no longer include asset allocation section

### 🧪 **Testing Results (Playwright MCP)**
All functionality tested successfully:
- ✅ Login flow with dynamic name extraction
- ✅ Home page navigation (Plan button & View Details active)
- ✅ Long-term plan form submission with goal amount
- ✅ **Enhanced AI plan generation** - 45 second comprehensive generation (7.5x more detailed)
- ✅ Plan view page displaying Arabic content correctly (handles 3000+ word plans)
- ✅ PDF download functionality with long content support
- ✅ All disabled buttons show proper "قريبًا" tooltip behavior
- ✅ **Add child functionality** - Complete workflow tested (add → save → display on home)
- ✅ **Children state management** - Empty state and populated state working correctly
- ✅ **Mobile responsiveness** - Full mobile optimization verified (375x667 viewport)
- ✅ **Touch interface** - All buttons meet 48px minimum touch target requirements
- ✅ **Comprehensive financial plans** - 12-section detailed analysis with professional calculations
- ✅ **Long content handling** - PDF generation works perfectly with enhanced plan length
- ✅ **Arabic RTL support** - Maintained throughout extended content sections

### 🎯 **Current Status**  
- **Application**: Fully functional and matches reference photos
- **Features**: All core functionality implemented and tested
- **Performance**: API responses within acceptable limits
- **UI/UX**: Pixel-perfect replication of provided designs
- **Testing**: Complete end-to-end flow verified with Playwright

## Important Notes
- **RTL Support**: Must be implemented globally, not just per component
- **Arabic Font**: Ensure proper Arabic font loading for both web and PDF
- **Fake Login**: No real authentication backend - purely client-side
- **Local Storage**: Used for persistence of children and session data
- **AI Responses**: Handle OpenAI API errors gracefully
- **PDF Download**: Implement proper file download functionality
- **Mobile First**: Design and develop with mobile-first approach

## File Structure Convention
```
src/
├── app/ → Next.js App Router pages
├── components/ → Reusable components
├── stores/ → Zustand state management
├── lib/ → Utility functions
├── types/ → TypeScript type definitions (html2pdf.d.ts)
└── styles/ → Global styles and Tailwind config
```

## 🚀 DEPLOYMENT INFORMATION

### Live Application
- **Production URL**: https://khutwa-app.vercel.app/
- **Status**: ✅ Successfully deployed and functional (Latest: Timeline Removal Update)
- **Platform**: Vercel
- **Region**: Washington D.C. (iad1)
- **Latest Deploy**: September 2024 - Timeline section removal deployed (Commit: 25b9987)

### Deployment Configuration
- **Repository**: https://github.com/Amsamms/khutwa_app (PRIMARY ONLY)
- **Branch**: main
- **Build Command**: `npm run build`
- **Framework**: Auto-detected Next.js
- **Git Remote**: `origin` points to khutwa_app repo only
- **Environment Variables**: 
  - `OPENAI_API_KEY`: Configured via Vercel dashboard

### Git Configuration
- **Primary Repository**: https://github.com/Amsamms/khutwa_app
- **Remote Setup**: Single `origin` remote (khutwa-financial-planning removed)
- **Push Command**: `git push origin main` (pushes to khutwa_app)

### Key Deployment Fixes Applied
1. **✅ Environment Variables**: Removed legacy secret references from vercel.json
2. **✅ TypeScript Types**: Added html2pdf.js type declarations
3. **✅ Mobile Optimization**: Complete responsive design with touch targets
4. **✅ Arabic RTL Support**: Proper right-to-left layout for Arabic content
5. **✅ PDF Generation**: Working Arabic PDF download functionality

### Performance Features
- **✅ Fast Build**: Optimized Next.js 15.5.2 build
- **✅ Mobile-First**: Touch-friendly interface (48px minimum touch targets)
- **✅ Arabic Support**: Full RTL layout with proper Arabic font rendering
- **✅ AI Integration**: GPT-4o API for comprehensive financial planning
- **✅ Edge Deployment**: Global CDN distribution via Vercel

### Testing Status
- **✅ Mobile Responsive**: Tested on 375x667 viewport (iPhone SE)
- **✅ Complete User Flow**: Login → Planning → PDF generation
- **✅ OpenAI Integration**: Verified Arabic content generation
- **✅ PDF Download**: Working Arabic PDF with RTL layout
- **✅ Logo Implementation**: Exact SVG specifications implemented

## 📱 MOBILE OPTIMIZATION ACHIEVED
- Viewport meta tag configured
- Touch-friendly buttons (min 48px)
- Responsive typography scaling
- Mobile form optimization
- Arabic RTL mobile support
- Complete mobile user flow tested

## 🎯 PROJECT COMPLETION SUMMARY
✅ **All Requirements Met**: Exact photo replication, mobile responsive, Arabic PDF generation  
✅ **Production Ready**: Successfully deployed and fully functional  
✅ **AI Powered**: OpenAI GPT-4o integration working perfectly  
✅ **Mobile Optimized**: Complete mobile-friendly experience  
✅ **Arabic Support**: Full RTL layout with proper Arabic fonts  
✅ **Testing Complete**: Playwright MCP testing throughout development