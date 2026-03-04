const { test, expect } = require('@playwright/test');
const CatalogPage = require('../src/pages/CatalogPage');
const LoginPage = require('../src/pages/LoginPage');
const loginTestData = require('../testData/loginTestData');

test.describe('Catalog Page functionality', () => {

    test('search filters results (assert result count changes and cards shown match query).', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const catalogPage = new CatalogPage(page);

        await loginPage.login(loginTestData.validUser.username, loginTestData.validUser.password);
        await loginPage.verifyLoginSuccessful();
        catalogPage.deriveExistingProducts();
    });


});