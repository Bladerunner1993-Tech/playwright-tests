const { test, expect, request } = require('@playwright/test');

let apiContext;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.AUTH_USER,
      password: process.env.AUTH_PASS,
    },
    extraHTTPHeaders: {
      // reuse the saved storage state's auth cookie
    },
    storageState: 'playwright/.auth/user.json',
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test('positive: creates a car with valid data', async () => {
  const response = await apiContext.post('/api/cars', {
    data: { carBrandId: 1, carModelId: 1, mileage: 10000 },
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.status).toBe('ok');
  expect(body.data.brand).toBe('Audi');
  expect(body.data.mileage).toBe(10000);
});

test('negative: missing carBrandId returns an error', async () => {
  const response = await apiContext.post('/api/cars', {
    data: { carModelId: 1, mileage: 10000 },
  });
  expect(response.status()).toBeGreaterThanOrEqual(400);
});

test('negative: negative mileage returns an error', async () => {
  const response = await apiContext.post('/api/cars', {
    data: { carBrandId: 1, carModelId: 1, mileage: -500 },
  });
  expect(response.status()).toBeGreaterThanOrEqual(400);
});
