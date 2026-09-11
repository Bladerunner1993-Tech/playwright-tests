const base = require('@playwright/test');
const { GaragePage } = require('../pages/GaragePage');

const authFile = 'playwright/.auth/user.json';

exports.test = base.test.extend({
  storageState: authFile,

  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.open();
    await use(garagePage);
  },
});

exports.expect = base.expect;
