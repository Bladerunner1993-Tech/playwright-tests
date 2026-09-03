const { test, expect } = require('../fixtures/userGaragePage');

test('mocked profile data is displayed on the Profile page', async ({ page }) => {
  await page.route('**/api/users/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: {
          userId: 999999,
          photoFilename: 'default-user.png',
          name: 'FakeName',
          lastName: 'FakeLastName',
        },
      }),
    });
  });

  await page.goto('/panel/profile');

  await expect(page.getByText('FakeName FakeLastName')).toBeVisible();
});
