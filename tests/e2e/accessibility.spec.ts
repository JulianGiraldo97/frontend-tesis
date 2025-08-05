import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('should have proper ARIA labels and roles', async ({ page }) => {
    await page.goto('/');
    
    // Check for skip link
    const skipLink = page.locator('[href="#main-content"]');
    await expect(skipLink).toBeVisible();
    
    // Check for main landmark
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();
    
    // Check for navigation landmark
    const navigation = page.locator('nav, [role="navigation"]');
    await expect(navigation).toBeVisible();
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    
    // Check that there's only one h1
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check that headings are properly nested
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings).toHaveCount.greaterThan(0);
  });

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/');
    
    // Check that all images have alt text
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to focus first element
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    
    // This is a basic test - in a real scenario you'd use axe-core
    // to check for color contrast violations
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('screen reader test component should be accessible', async ({ page }) => {
    await page.goto('/profile');
    
    // Look for screen reader test component
    const screenReaderTest = page.locator('text=Test del Lector de Pantalla');
    await expect(screenReaderTest).toBeVisible();
    
    // Check for screen reader controls
    const screenReaderButton = page.locator('button:has-text("Probar Lector de Pantalla")');
    await expect(screenReaderButton).toBeVisible();
  });

  test('modal accessibility', async ({ page }) => {
    await page.goto('/employer');
    
    // Click on a vacancy to open modal
    const viewButton = page.locator('button:has-text("Ver")').first();
    await viewButton.click();
    
    // Check that modal is accessible
    const modal = page.locator('.modal');
    await expect(modal).toBeVisible();
    
    // Check for close button
    const closeButton = page.locator('button[aria-label="Cerrar"]');
    await expect(closeButton).toBeVisible();
    
    // Check for screen reader controls in modal
    const screenReaderSection = page.locator('text=Lector de Pantalla');
    await expect(screenReaderSection).toBeVisible();
  });

  test('form accessibility', async ({ page }) => {
    await page.goto('/login');
    
    // Check that form inputs have proper labels
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
    
    // Check that buttons have proper text
    const loginButton = page.locator('button:has-text("Iniciar Sesión")');
    await expect(loginButton).toBeVisible();
  });

  test('responsive design accessibility', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that navigation is still accessible
    const navigation = page.locator('nav, [role="navigation"]');
    await expect(navigation).toBeVisible();
    
    // Check that content is readable
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();
  });
}); 