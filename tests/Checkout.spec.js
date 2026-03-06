const { test, expect } = require('@playwright/test');
const CheckOutOrderPage = require('../src/pages/CheckOutOrderPage');
const CatalogPage = require('../src/pages/CatalogPage');
const LoginPage = require('../src/pages/LoginPage');
const loginTestData = require('../testData/loginTestData');
const Constants = require('../src/utils/Constants');
const checkOutLocators = require('../src/locators/CheckOutLocators');

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
        expect("$" + lineTotal).toBe(productPrice);

        // increase quantity and verify line total 
        await checkOutOrderPage.increaseQty();
        const increasedLineTotal = await checkOutOrderPage.getCartItemLineTotal();
        expect("$" + increasedLineTotal).toBe("$" + (lineTotal * 2));

        // decrease quantity and verify line total
        await checkOutOrderPage.decreaseQty();
        const decreasedLineTotal = await checkOutOrderPage.getCartItemLineTotal();
        expect("$" + decreasedLineTotal).toBe(productPrice);
    });

    test('apply promo code SAVE10 reduces totals', async ({ page }) => {
        await catalogPage.clickAddToCart();
        const productPrice = await catalogPage.getFirstProductPrice();
        console.log("First Product Price:", productPrice);
        await catalogPage.clickGoCheckOut();

        const totalBeforePromo = await checkOutOrderPage.getGenericItemPrice(checkOutLocators.TOTAL_AMOUNT);
        console.log("Total before applying promo code: $" + totalBeforePromo);

        // apply promo code
        await checkOutOrderPage.applyPromoCode();

        const promoAmount = await checkOutOrderPage.getGenericItemPrice(checkOutLocators.PROMO_AMOUNT);
        console.log("Promo amount applied: $" + promoAmount);
        expect(promoAmount).toBeGreaterThan(0);
 
        const totalAfterPromo = await checkOutOrderPage.getGenericItemPrice(checkOutLocators.TOTAL_AMOUNT);
        console.log("Total after applying promo code: $" + totalAfterPromo);
        expect(totalAfterPromo).toBeLessThan(totalBeforePromo);
    });


    test(' validate required fields', async ({ page }) => {
        await catalogPage.clickAddToCart();
        const productPrice = await catalogPage.getFirstProductPrice();
        console.log("First Product Price:", productPrice);
        await catalogPage.clickGoCheckOut();

        // validate required fields
        
    });

    test('order confirmation view shows Order ID and total', async ({ page }) => {
        await catalogPage.clickAddToCart();
        const productPrice = await catalogPage.getFirstProductPrice();
        console.log("First Product Price:", productPrice);
        await catalogPage.clickGoCheckOut();

        await checkOutOrderPage.placeOrder();

        // assertions realted to order id 
    });

});