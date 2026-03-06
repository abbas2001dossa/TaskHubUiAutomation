// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const loginTestData = require('../testData/loginTestData');


test.describe('Login functionality', () => {
  test('valid credentials navigates to Catalog.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(loginTestData.validUser.username, loginTestData.validUser.password);
    await loginPage.verifyLoginSuccessful();
  });

  test('invalid credentials show inline error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(loginTestData.invalidUser.username, loginTestData.invalidUser.password);
    await loginPage.verifyLoginFailed();
  });
});


