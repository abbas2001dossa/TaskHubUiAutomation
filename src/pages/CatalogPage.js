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
        this.productNames = page.locator(CatalogLocators.PRODUCT_NAMES);
    }

    async searchProduct(productName) {
    }

    async deriveExistingProducts(){
        const productNames = await this.productNames.allTextContents();
        console.log('Existing products:', productNames);
        return productNames;
    }


}

module.exports = CatalogPage;