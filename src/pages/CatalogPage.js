const BasePage = require('../BasePage');
const EnvUtil = require('./../utils/envConfig');
const CatalogLocators = require('../locators/CatalogLocators');


class CatalogPage extends BasePage {

    constructor(page) {
        super(page);
        this.searchInput = page.locator(CatalogLocators.SEARCH_INPUT);
        this.resultCount = page.locator(CatalogLocators.RESULT_COUNT_TEXT);
        this.sortDropdown = page.locator(CatalogLocators.SORT_DROPDOWN);
        this.categoryDropdown = page.locator(CatalogLocators.CATEGORY_DROPDOWN);
        this.inStockCheckbox = page.locator(CatalogLocators.INSTOCK_CHECKBOX);
        this.productNames = page.locator('[data-testid="product-name"]');
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

    async verifySearchResultsContain() {
        console.log("Current Result Count : " + await this.getResultCount());
    }

    async deriveExistingProducts() {
        await this.page.waitForSelector('[data-testid="product-name"]');
        const productNames = await this.productNames.allTextContents();
        const secondProductName = productNames[1];
        // console.log('Second product:', secondProductName);
        return secondProductName;
    }


}

module.exports = CatalogPage;