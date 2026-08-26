const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://qauto.forstudy.space/');
  await page.getByRole('button', { name: 'Sign up' }).click();
});

test('successful registration', async ({ page }) => {
  const email = `aqa-${Date.now()}@test.com`;
  await page.locator('#signupName').fill('Alex');
  await page.locator('#signupLastName').fill('Test');
  await page.locator('#signupEmail').fill(email);
  await page.locator('#signupPassword').fill('Qwerty123');
  await page.locator('#signupRepeatPassword').fill('Qwerty123');
  await page.locator('ngb-modal-window').getByRole('button', { name: 'Register' }).click();
  await expect(page).toHaveURL(/panel\/garage/);
});

test('empty name shows error', async ({ page }) => {
  await page.locator('#signupName').click();
  await page.locator('#signupLastName').click();
  await expect(page.getByText('Name required')).toBeVisible();
});

test('invalid name shows error', async ({ page }) => {
  await page.locator('#signupName').fill('12345');
  await page.locator('#signupLastName').click();
  await expect(page.getByText('Name is invalid')).toBeVisible();
});

test('invalid email shows error', async ({ page }) => {
  await page.locator('#signupEmail').fill('bad-email');
  await page.locator('#signupPassword').click();
  await expect(page.getByText('Email is incorrect')).toBeVisible();
});

test('weak password shows error', async ({ page }) => {
  await page.locator('#signupPassword').fill('qwerty');
  await page.locator('#signupRepeatPassword').click();
  await expect(page.getByText(/Password has to be from 8 to 15 characters/)).toBeVisible();
});

test('mismatched passwords shows error', async ({ page }) => {
  await page.locator('#signupPassword').fill('Qwerty123');
  await page.locator('#signupRepeatPassword').fill('Wrong123');
  await page.locator('#signupName').click();
  await expect(page.getByText('Passwords do not match')).toBeVisible();
});
