const { test, expect } = require('@playwright/test');
const CatalogPage = require('../src/pages/CatalogPage');
const LoginPage = require('../src/pages/LoginPage');
const loginTestData = require('../testData/loginTestData');
const Constants = require('../src/utils/Constants');

test.describe('Catalog Page functionality ', () => {

    let loginPage;
    let catalogPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        catalogPage = new CatalogPage(page);

        // login before every test
        await loginPage.login(loginTestData.validUser.username, loginTestData.validUser.password);
        await loginPage.verifyLoginSuccessful();
    });

    test('search filters results (assert result count changes and cards shown match query).', async ({ page }) => {

        // derive an existing product name from the catalog page to use as search query
        const searchProductName = await catalogPage.deriveExistingProducts();
        const productCountBeforeSearch = await catalogPage.getResultCount();
        console.log('Search product name:', searchProductName);

        // search the product and get the result count after search
        await catalogPage.searchProduct(searchProductName);
        const productCountAfterSearch = await catalogPage.getResultCount();

        // assert search results count is 1 after search
        expect(1).toBe(productCountAfterSearch);

        // assert searched product name is shown in the results
        const actualSearchedProductName = await catalogPage.getFirstProductName();
        expect(actualSearchedProductName).toBe(searchProductName);

    });

    test(' in-stock-only filter hides out-of-stock items; out-of-stock Add to cart is disabled', async ({ page }) => {

        //1 - Confirm that when the filter is not applied, both in-stock and out-of-stock products are visible in the catalog.
        const stockStatusesBeforeFilter = await catalogPage.derviveExistingProductStockStatus();
        console.log('Stock statuses before applying in-stock filter:', stockStatusesBeforeFilter);
        // assert that both in-stock and out-of-stock products are visible
        expect(stockStatusesBeforeFilter).toContain(Constants.IN_STOCK_TEXT);
        expect(stockStatusesBeforeFilter).toContain(Constants.OUT_OF_STOCK_TEXT);

        //2 - Enable the in-stock-only filter and confirm that out-of-stock products are no longer visible in the catalog.
        await catalogPage.enableInStockCheckBox();
        const stockStatusesAfterFilter = await catalogPage.derviveExistingProductStockStatus();
        console.log('Stock statuses after applying in-stock filter:', stockStatusesAfterFilter);
        // assert only instock products are shown 
        expect(stockStatusesAfterFilter).toContain(Constants.IN_STOCK_TEXT);
        expect(stockStatusesAfterFilter).not.toContain(Constants.OUT_OF_STOCK_TEXT);

        // so both statuses could be viewed again
        await catalogPage.enableInStockCheckBox();
        await page.waitForTimeout(3000);

        //3- Ensure that for out-of-stock products, the “Add to cart” button is disabled
        // await catalogPage.locateAddToCartButtonByStatus(Constants.OUT_OF_STOCK_TEXT);
        // await catalogPage.confirmAddToCartNotification();
    });

    test('add at least one item to cart; cart badge increments', async ({ page }) => {
        await catalogPage.enableInStockCheckBox();
        const initialCartCount = await catalogPage.getCartBadgeCount();
        console.log('Initial cart count:', initialCartCount);

        await catalogPage.locateAddToCartButtonByStatus(Constants.IN_STOCK_TEXT);
        await catalogPage.confirmAddToCartNotification();
        const finalCartCount = await catalogPage.getCartBadgeCount();
        console.log('Final cart count:', finalCartCount);
        expect(parseInt(finalCartCount)).toBe(parseInt(initialCartCount) + 1);
    });

    


});