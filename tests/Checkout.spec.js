const { test, expect } = require('@playwright/test');
const CheckOutOrderPage = require('../src/pages/CheckOutOrderPage');
const CatalogPage = require('../src/pages/CatalogPage');
const LoginPage = require('../src/pages/LoginPage');
const loginTestData = require('../testData/loginTestData');
const Constants = require('../src/utils/Constants');

test.describe('Checkout Page functionality ', () => {

    let loginPage;
    let catalogPage;
    let checkOutOrderPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        catalogPage = new CatalogPage(page);
        checkOutOrderPage = new CheckOutOrderPage(page);
        // login before every test
        await loginPage.login(loginTestData.validUser.username, loginTestData.validUser.password);
        await loginPage.verifyLoginSuccessful();
        await catalogPage.enableInStockCheckBox();
    });

    test('cart table shows added item(s) with correct line totals; quantity +/- updates totals', async ({ page }) => {
        await catalogPage.clickAddToCart();
        const productPrice = await catalogPage.getFirstProductPrice();
        console.log("First Product Price:", productPrice);
        await catalogPage.clickGoCheckOut();

        // verify line total equals product price for quantity 1
        const lineTotal = await checkOutOrderPage.getCartItemLineTotal();
        expect("$"+lineTotal).toBe(productPrice);

        // increase quantity and verify line total 
        await checkOutOrderPage.increaseQty();
        const increasedLineTotal = await checkOutOrderPage.getCartItemLineTotal();
        expect("$"+increasedLineTotal).toBe("$"+(lineTotal * 2));

        // decrease quantity and verify line total
        await checkOutOrderPage.decreaseQty();
        const decreasedLineTotal = await checkOutOrderPage.getCartItemLineTotal();
        expect("$"+decreasedLineTotal).toBe(productPrice);
    });

    

});