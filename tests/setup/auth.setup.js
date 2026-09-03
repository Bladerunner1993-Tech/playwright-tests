const { test: setup } = require('@playwright/test');

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const email = `aqa-storagestate-${Date.now()}@test.com`;
  const password = 'Qwerty123';

  await page.goto('/');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.locator('#signupName').fill('Storage');
  await page.locator('#signupLastName').fill('State');
  await page.locator('#signupEmail').fill(email);
  await page.locator('#signupPassword').fill(password);
  await page.locator('#signupRepeatPassword').fill(password);
  await page.locator('ngb-modal-window').getByRole('button', { name: 'Register' }).click();
  await page.waitForURL(/panel\/garage/);

  await page.context().storageState({ path: authFile });
});
