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

### Route Structure (Based on Reference Photos)
```
/ → Splash screen with Khutwa logo (Logo and name.png)
/login → Fake login page (Fake log in.png - English interface as shown)
/home → Dashboard (Home Page only active buttons would be add child and long plan.png)
/add-child → Child registration form (Add Child button.png)  
/long-term-plan → Financial planning form (Long term plan button.png)
```

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
- ✅ AI plan generation (32 second response time)
- ✅ Plan view page displaying Arabic content correctly
- ✅ PDF download functionality implemented
- ✅ All disabled buttons show proper "قريبًا" tooltip behavior

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
- **Status**: ✅ Successfully deployed and functional
- **Platform**: Vercel
- **Region**: Washington D.C. (iad1)

### Deployment Configuration
- **Repository**: https://github.com/Amsamms/khutwa_app
- **Branch**: main
- **Build Command**: `npm run build`
- **Framework**: Auto-detected Next.js
- **Environment Variables**: 
  - `OPENAI_API_KEY`: Configured via Vercel dashboard

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