const BasePage = require('../BasePage');
const EnvUtil = require('../utils/envConfig');
const CatalogLocators = require('../locators/CatalogLocators');


class CatalogPage extends BasePage {

    constructor(page) {
        super(page);
        this.searchInput = page.locator(CatalogLocators.SEARCH_INPUT);
        this.resultCount = page.locator(CatalogLocators.RESULT_COUNT_TEXT);
        this.sortDropdown = page.locator(CatalogLocators.SORT_DROPDOWN);
        this.categoryDropdown = page.locator(CatalogLocators.CATEGORY_DROPDOWN);
        this.inStockCheckbox = page.locator(CatalogLocators.INSTOCK_CHECKBOX);
        this.productNames = page.locator(CatalogLocators.PRODUCT_NAMES);
        this.stockStatus = page.locator(CatalogLocators.STOCK_STATUS);
        this.addToCartButton = page.locator(CatalogLocators.ADD_TO_CART_BUTTON);
        this.addToCartNotification = page.locator(CatalogLocators.ADD_TO_CART_NOTIFICATION);
        this.cartCountBadge = page.locator(CatalogLocators.CART_COUNT_BADGE);
        this.goCheckOutButton = page.locator(CatalogLocators.GO_CHECKOUT_BUTTON);
        this.productPrice= page.locator(CatalogLocators.PRODUCT_PRICE);
    }

    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.page.waitForTimeout(2000);
    }

    async getResultCount() {
        const countText = await this.resultCount.textContent();
        const countMatch = countText.match(/\d+/);
        return countMatch ? parseInt(countMatch[0]) : 0;
    }

    async getFirstProductName() {
        // wait for at least one product name to appear
        await this.page.waitForSelector('[data-testid="product-name"]');
        return await this.productNames.first().textContent();
    }

    async enableInStockCheckBox() {
        await this.inStockCheckbox.check();
        await this.page.waitForTimeout(2000);
    }

    async deriveExistingProducts() {
        // ensure at least one name is present
        await this.page.waitForSelector('[data-testid="product-name"]');
        const productNames = await this.productNames.allTextContents();

        // choose random index between 0 and 7 (inclusive), or less if fewer names
        const maxIdx = Math.min(productNames.length - 1, 7);
        const randomIndex = Math.floor(Math.random() * (maxIdx + 1));
        const chosen = productNames[randomIndex];
        return chosen;
    }

    async derviveExistingProductStockStatus() {
        // ensure at least one name is present
        await this.page.waitForSelector('[data-testid="stock-tag"]');
        const productStockStatus = await this.stockStatus.allTextContents();
        return productStockStatus;
    }

    async confirmAddToCartNotification() {
        await this.page.waitForSelector('//*[contains(@class,"toast")]');
        const notificationText = await this.addToCartNotification.textContent();
        return notificationText;
    }

    async clickAddToCart() {
        await this.addToCartButton.first().click();
        await this.page.waitForTimeout(2000);
    }

    async clickGoCheckOut() {
        await this.goCheckOutButton.click();
        await this.page.waitForTimeout(2000);
    }

    async locateAddToCartButtonByStatus(status) {
        // find the card element that contains a stock-tag with the given text
        const card = this.page.locator('div.card', {
            has: this.page.locator('[data-testid="stock-tag"]', { hasText: status })
        });
        // then find the add-to-cart button inside that card
        const addToCartButton = card.locator('[data-testid="add-to-cart"]');
        // click the first matching button (there should only be one per card)
        await addToCartButton.first().click();
    }

    async getCartBadgeCount() {
        return await this.cartCountBadge.textContent();
    }

    async getFirstProductPrice() {
        await this.page.waitForSelector('[data-testid="product-price"]');
        return await this.productPrice.first().textContent();
    }

}

module.exports = CatalogPage;