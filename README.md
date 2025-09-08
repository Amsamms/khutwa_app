# Khutwa - Financial Planning Application

A modern Arabic financial planning web application built with Next.js, designed for parents to plan their children's financial future.

## Features

- **Exact Design Replication**: Pixel-perfect implementation of provided designs
- **Arabic RTL Support**: Full right-to-left layout and Arabic text support
- **AI-Powered Plans**: OpenAI integration for generating personalized financial plans
- **Mobile Responsive**: Touch-friendly interface optimized for all devices
- **PDF Generation**: Download financial plans as formatted documents
- **Fake Authentication**: Demo login functionality for testing

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: TailwindCSS with RTL support
- **State Management**: Zustand with localStorage persistence
- **AI Integration**: OpenAI API (GPT-4)
- **PDF Generation**: @react-pdf/renderer
- **Testing**: Playwright
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd khutwa
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Add your OpenAI API key to .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (OpenAI integration)
│   ├── add-child/         # Add child form page
│   ├── home/              # Dashboard page
│   ├── login/             # Login page
│   ├── long-term-plan/    # Financial planning form
│   └── plan-view/         # Generated plan display
├── components/            # Reusable components
│   ├── Logo.tsx          # Khutwa logo component
│   └── ui/               # UI components
├── stores/               # Zustand state management
│   ├── authStore.ts      # Authentication state
│   ├── childrenStore.ts  # Children data management
│   └── planStore.ts      # Financial plans state
└── lib/                  # Utility functions
    └── pdfGenerator.tsx  # PDF generation logic
```

## Key Features Implementation

### 1. Authentication Flow
- Fake login accepts any credentials
- User data stored in localStorage
- Automatic redirect handling

### 2. Add Child Functionality
- Required: Name, Gender, Age
- Optional: Primary Goal
- Pink/Blue gender buttons as per design
- Data persistence with Zustand + localStorage

### 3. Long-Term Financial Plan
- Comprehensive form with age inputs, risk level selection
- Interactive timeline slider
- Real-time SAR currency calculations
- AI integration for Arabic plan generation

### 4. Button State Management
**Active Buttons:**
- Login button
- "Add Chil" button (home page)
- Save Child button
- Generate plan button
- Home navigation icons

**Disabled Buttons (show "قريبًا" tooltip):**
- Add Task
- Add Goal  
- Challenge
- Plan (top-right)
- Location pin
- Notification bell
- View Details links

## API Integration

### OpenAI Financial Planning
The app generates personalized Arabic financial plans using OpenAI's GPT-4:

```typescript
// Prompt structure for Arabic financial planning
const prompt = `
أنشئ خطة مالية مخصصة بناءً على هذه المدخلات:
الاسم: ${name}
الهدف: ${goal}
العمر الحالي: ${age}
العمر المستهدف: ${targetAge}
مستوى المخاطرة: ${riskLevel}
العملة: SAR
...
`;
```

## Testing

### Playwright Tests
Comprehensive end-to-end tests covering:
- Complete user journey flows
- Button state verification
- Mobile responsiveness
- RTL layout support
- Disabled button tooltips

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run tests
npx playwright test
```

## Deployment

### Vercel Deployment

1. Connect repository to Vercel
2. Set environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
3. Deploy automatically on push to main branch

### Environment Variables
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

## Mobile Responsiveness

- Touch-friendly 44px minimum button sizes
- Responsive grid layouts
- Mobile-optimized form inputs
- iOS zoom prevention (16px font size)
- Responsive navigation patterns

## Arabic & RTL Support

- Global RTL layout configuration
- Arabic font integration (Cairo, Noto Sans Arabic)
- Proper text direction handling
- Arabic content generation via AI
- Currency formatting in SAR

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npx playwright test # Run E2E tests
```

## Contributing

1. Follow the established design patterns
2. Maintain pixel-perfect design replication
3. Test on both desktop and mobile
4. Ensure Arabic RTL compatibility
5. Run tests before submitting changes

## License

Private project - All rights reserved.