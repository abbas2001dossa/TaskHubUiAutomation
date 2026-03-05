class CatalogLocators {
    static CATALOG_TEXT='//h1[contains(text(), "Catalog")]';
    static RESULT_COUNT_TEXT='[data-testid="result-count"]';
    static SEARCH_INPUT='//*[contains(@id, "searchInput")]';
    static SORT_DROPDOWN='//select[@data-testid="sort"]';
    static CATEGORY_DROPDOWN='//select[@data-testid="category"]';
    static INSTOCK_CHECKBOX='//input[@data-testid="in-stock-only"]';
    static PRODUCT_NAMES='[data-testid="product-name"]'
}

module.exports=CatalogLocators;