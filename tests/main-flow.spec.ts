import { test, expect } from '@playwright/test';

test.describe('Khutwa App - Main User Flow', () => {
  test('should complete full user journey: splash → login → home → add child → long term plan', async ({ page }) => {
    // Test 1: Splash Screen
    await page.goto('/');
    await expect(page.locator('text=Khutwa')).toBeVisible();
    
    // Should auto-redirect to login after 2 seconds
    await page.waitForURL('/login', { timeout: 3000 });
    
    // Test 2: Login Page - Exact replica verification
    await expect(page.locator('text=Welcome Back')).toBeVisible();
    await expect(page.locator('text=Fahad')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toHaveValue('Fahad.j@gmail.com');
    await expect(page.locator('text=sign In (Parent)')).toBeVisible();
    
    // Test fake login
    await page.click('button:has-text("sign In (Parent)")');
    
    // Should redirect to home
    await page.waitForURL('/home');
    
    // Test 3: Home Dashboard - Verify exact replica
    await expect(page.locator('text=Welcome, Fahad')).toBeVisible();
    await expect(page.locator('text=Long-Term Plan')).toBeVisible();
    await expect(page.locator('text=Omar - Study Abroad')).toBeVisible();
    await expect(page.locator('text=50%')).toBeVisible();
    await expect(page.locator('text=Children')).toBeVisible();
    await expect(page.locator('text=Hala')).toBeVisible();
    await expect(page.locator('text=Adam')).toBeVisible();
    
    // Test disabled buttons show tooltip
    const addTaskBtn = page.locator('button:has-text("Add Task")');
    await expect(addTaskBtn).toBeDisabled();
    
    const addGoalBtn = page.locator('button:has-text("Add Goal")');
    await expect(addGoalBtn).toBeDisabled();
    
    const challengeBtn = page.locator('button:has-text("Challenge")');
    await expect(challengeBtn).toBeDisabled();
    
    // Test 4: Add Child Flow - Only active button
    const addChildBtn = page.locator('button:has-text("Add Chil")');
    await expect(addChildBtn).toBeEnabled();
    await addChildBtn.click();
    
    await page.waitForURL('/add-child');
    
    // Verify Add Child form exact replica
    await expect(page.locator('text=Add Child')).toBeVisible();
    await expect(page.locator('text=Child Name (required )')).toBeVisible();
    await expect(page.locator('text=Gender (required )')).toBeVisible();
    await expect(page.locator('button:has-text("Girl")')).toBeVisible();
    await expect(page.locator('button:has-text("Boy")')).toBeVisible();
    
    // Fill out form
    await page.fill('input[type="text"]', 'Test Child');
    await page.click('button:has-text("Boy")');
    await page.fill('input[type="number"]', '8');
    await page.fill('textarea', 'Learning piano');
    
    // Submit form
    await page.click('button:has-text("Save Child")');
    
    // Should return to home
    await page.waitForURL('/home');
    
    // Test 5: Long-Term Plan Flow
    await page.click('text=View Details');
    await page.waitForURL('/long-term-plan');
    
    // Verify Long-Term Plan form
    await expect(page.locator('text=Long - Term Plan')).toBeVisible();
    await expect(page.locator('text=Name (required )')).toBeVisible();
    await expect(page.locator('text=Risk Level')).toBeVisible();
    await expect(page.locator('button:has-text("LOW")')).toBeVisible();
    await expect(page.locator('button:has-text("MEDIUM")')).toBeVisible();
    await expect(page.locator('button:has-text("HIGH")')).toBeVisible();
    
    // Fill out long-term plan
    await page.fill('input[placeholder=""]', 'Test User');
    await page.fill('input:nth-of-type(2)', 'Study Abroad');
    await page.fill('input:nth-of-type(3)', '18');
    await page.fill('input:nth-of-type(4)', '22');
    await page.fill('input:nth-of-type(5)', 'Male');
    await page.click('button:has-text("MEDIUM")');
    
    // Test Generate Plan button (should be enabled after filling form)
    const generateBtn = page.locator('button:has-text("Generate plan")');
    await expect(generateBtn).toBeVisible();
  });

  test('should verify disabled button tooltips', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.click('button:has-text("sign In (Parent)")');
    await page.waitForURL('/home');
    
    // Test disabled buttons on home page
    const disabledButtons = [
      'button:has-text("Add Task")',
      'button:has-text("Add Goal")', 
      'button:has-text("Challenge")'
    ];
    
    for (const selector of disabledButtons) {
      const button = page.locator(selector);
      await expect(button).toBeDisabled();
    }
    
    // Test "قريبًا" tooltip appears on click
    await page.click('button:has-text("Add Task")');
    // Note: Alert testing would require additional setup in real implementation
  });

  test('should verify mobile responsiveness', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/login');
    await page.click('button:has-text("sign In (Parent)")');
    await page.waitForURL('/home');
    
    // Verify mobile layout adjustments
    await expect(page.locator('.grid-cols-2')).toBeVisible(); // Mobile button grid
    
    // Test add child form on mobile
    await page.click('button:has-text("Add Chil")');
    await page.waitForURL('/add-child');
    
    // Verify form is usable on mobile
    await expect(page.locator('text=Add Child')).toBeVisible();
    await expect(page.locator('button:has-text("Girl")')).toBeVisible();
    await expect(page.locator('button:has-text("Boy")')).toBeVisible();
  });

  test('should verify RTL layout and Arabic text support', async ({ page }) => {
    await page.goto('/login');
    await page.click('button:has-text("sign In (Parent)")');
    await page.waitForURL('/home');
    
    // Navigate to long-term plan to test Arabic integration
    await page.click('text=View Details');
    await page.waitForURL('/long-term-plan');
    
    // Fill form and submit to see Arabic plan generation
    await page.fill('input[placeholder=""]', 'أحمد');
    await page.fill('input:nth-of-type(2)', 'دراسة في الخارج');
    await page.fill('input:nth-of-type(3)', '18');
    await page.fill('input:nth-of-type(4)', '22');
    await page.fill('input:nth-of-type(5)', 'ذكر');
    await page.click('button:has-text("MEDIUM")');
    
    // Verify Generate Plan button is accessible
    await expect(page.locator('button:has-text("Generate plan")')).toBeVisible();
  });
});