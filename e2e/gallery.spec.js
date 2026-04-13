import { test, expect } from '@playwright/test';

test.describe('Drag & Drop Gallery E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:3000');
    
    // Login to access gallery
    await page.locator('input[id="email"]').fill('user@example.com');
    await page.locator('input[id="password"]').fill('password123');
    await page.locator('button:has-text("Login")').click();
    
    // Wait for gallery page to load
    await page.waitForURL('**/');
    await page.waitForSelector('.gallery-grid');
  });

  test('TEST 1️⃣: Gallery Page Loads with All Images', async ({ page }) => {
    // Verify gallery page title
    await expect(page.locator('h1:has-text("Drag & Drop Gallery")')).toBeVisible();
    
    // Verify all 6 images are visible
    const galleryItems = page.locator('[draggable="true"]');
    await expect(galleryItems).toHaveCount(6);
    
    // Verify instructions are visible
    await expect(page.locator('text=Drag and drop images to reorder them')).toBeVisible();
  });

  test('TEST 2️⃣: Gallery Items Have Accessibility Attributes', async ({ page }) => {
    // Verify first gallery item has aria-label
    const firstItem = page.locator('[draggable="true"]').first();
    const ariaLabel = await firstItem.getAttribute('aria-label');
    
    expect(ariaLabel).toContain('position 1 of 6');
    expect(ariaLabel).toContain('Drag to reorder');
    
    // Verify all items have required attributes
    const allItems = page.locator('[draggable="true"]');
    for (let i = 0; i < 6; i++) {
      const item = allItems.nth(i);
      await expect(item).toHaveAttribute('role', 'button');
      await expect(item).toHaveAttribute('tabIndex', '0');
      await expect(item).toHaveAttribute('title');
    }
  });

  test('TEST 3️⃣: Gallery Images Have Alt Text', async ({ page }) => {
    // Verify all images have alt text
    const images = page.locator('.gallery-item img');
    const count = await images.count();
    
    expect(count).toBe(6);
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const altText = await img.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText?.length).toBeGreaterThan(0);
    }
  });

  test('TEST 4️⃣: Drag and Drop Reorders Gallery Items', async ({ page }) => {
    // Get initial order of images
    const firstItemBefore = page.locator('[draggable="true"]').first();
    const firstAltTextBefore = await firstItemBefore.locator('img').getAttribute('alt');
    
    // Get second item
    const secondItem = page.locator('[draggable="true"]').nth(1);
    
    // Perform drag and drop
    await firstItemBefore.dragTo(secondItem);
    
    // Wait for reorder animation
    await page.waitForTimeout(1000);
    
    // Verify order changed
    const firstItemAfter = page.locator('[draggable="true"]').first();
    const firstAltTextAfter = await firstItemAfter.locator('img').getAttribute('alt');
    
    // The first item should now be different
    expect(firstAltTextAfter).not.toBe(firstAltTextBefore);
  });

  test('TEST 5️⃣: Gallery Info Section Displays Correctly', async ({ page }) => {
    // Verify gallery info section exists
    await expect(page.locator('text=Gallery Info:')).toBeVisible();
    
    // Verify total images count
    await expect(page.locator('text=Total Images: 6')).toBeVisible();
    
    // Verify instructions text
    await expect(page.locator('text=Try dragging images to reorder them')).toBeVisible();
    
    // Verify logout button is accessible
    const logoutButton = page.locator('button:has-text("Logout")');
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toHaveAttribute('aria-label', 'Logout from gallery');
  });
});

test.describe('Multi-Browser Gallery Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:3000');
    
    // Login to access gallery
    await page.locator('input[id="email"]').fill('user@example.com');
    await page.locator('input[id="password"]').fill('password123');
    await page.locator('button:has-text("Login")').click();
    
    // Wait for gallery page to load
    await page.waitForURL('**/');
    await page.waitForSelector('.gallery-grid');
  });

  test('MB-TEST 1️⃣: Gallery Page Loads with All Images', async ({ page }) => {
    // Verify gallery page title
    await expect(page.locator('h1:has-text("Drag & Drop Gallery")')).toBeVisible();
    
    // Verify all 6 images are visible
    const galleryItems = page.locator('[draggable="true"]');
    await expect(galleryItems).toHaveCount(6);
    
    // Verify instructions are visible
    await expect(page.locator('text=Drag and drop images to reorder them')).toBeVisible();
  });

  test('MB-TEST 2️⃣: Gallery Items Have Accessibility Attributes', async ({ page }) => {
    // Verify first gallery item has aria-label
    const firstItem = page.locator('[draggable="true"]').first();
    const ariaLabel = await firstItem.getAttribute('aria-label');
    
    expect(ariaLabel).toContain('position 1 of 6');
    expect(ariaLabel).toContain('Drag to reorder');
    
    // Verify all items have required attributes
    const allItems = page.locator('[draggable="true"]');
    for (let i = 0; i < 6; i++) {
      const item = allItems.nth(i);
      await expect(item).toHaveAttribute('role', 'button');
      await expect(item).toHaveAttribute('tabIndex', '0');
      await expect(item).toHaveAttribute('title');
    }
  });

  test('MB-TEST 3️⃣: Gallery Images Have Alt Text', async ({ page }) => {
    // Verify all images have alt text
    const images = page.locator('.gallery-item img');
    const count = await images.count();
    
    expect(count).toBe(6);
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const altText = await img.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText?.length).toBeGreaterThan(0);
    }
  });

  test('MB-TEST 4️⃣: Drag and Drop Reorders Gallery Items', async ({ page }) => {
    // Get initial order of images
    const firstItemBefore = page.locator('[draggable="true"]').first();
    const firstAltTextBefore = await firstItemBefore.locator('img').getAttribute('alt');
    
    // Get second item
    const secondItem = page.locator('[draggable="true"]').nth(1);
    
    // Perform drag and drop
    await firstItemBefore.dragTo(secondItem);
    
    // Wait for reorder animation
    await page.waitForTimeout(1000);
    
    // Verify order changed
    const firstItemAfter = page.locator('[draggable="true"]').first();
    const firstAltTextAfter = await firstItemAfter.locator('img').getAttribute('alt');
    
    // The first item should now be different
    expect(firstAltTextAfter).not.toBe(firstAltTextBefore);
  });

  test('MB-TEST 5️⃣: Gallery Info Section Displays Correctly', async ({ page }) => {
    // Verify gallery info section exists
    await expect(page.locator('text=Gallery Info:')).toBeVisible();
    
    // Verify total images count
    await expect(page.locator('text=Total Images: 6')).toBeVisible();
    
    // Verify instructions text
    await expect(page.locator('text=Try dragging images to reorder them')).toBeVisible();
    
    // Verify logout button is accessible
    const logoutButton = page.locator('button:has-text("Logout")');
    await expect(logoutButton).toBeVisible();
    await expect(logoutButton).toHaveAttribute('aria-label', 'Logout from gallery');
  });
});
