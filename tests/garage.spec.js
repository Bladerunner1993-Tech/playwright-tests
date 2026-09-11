const { test, expect } = require('../fixtures/userGaragePage');

test('logged-in user sees the Garage page', async ({ userGaragePage }) => {
  await expect(userGaragePage.heading).toBeVisible();
  await expect(userGaragePage.addCarBtn).toBeVisible();
});
