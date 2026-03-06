const BasePage = require('../BasePage');
const EnvUtil = require('../utils/envConfig');
const baseUrl = EnvUtil.get('BASE_URL');
const Constants = require('../utils/Constants');
const LoginLocators = require('../locators/LoginLocators');
const { expect } = require('@playwright/test');
const checkOutLocators = require('../locators/CheckOutLocators');


class CheckOutOrderPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItemPrice = page.locator(checkOutLocators.CART_ITEM_PRICE);
    this.cartItemLineTotal = page.locator(checkOutLocators.CART_ITEM_LINE_TOTAL);
    this.quantityIncreaseButton = page.locator(checkOutLocators.QUANTITY_INCREASE_BUTTON);
    this.quantityDecreaseButton = page.locator(checkOutLocators.QUANTITY_DECREASE_BUTTON);
  }

  async getCartItemPrice() {
    await this.page.waitForSelector(checkOutLocators.CART_ITEM_PRICE);
    const priceText = await this.cartItemPrice.first().textContent();
    return parseFloat(priceText.replace('$', '').trim());
  }

  async increaseQty(){
    await this.quantityIncreaseButton.first().click();
    await this.page.waitForTimeout(2000);
  }

  async decreaseQty(){
    await this.quantityDecreaseButton.first().click();
    await this.page.waitForTimeout(2000);
  }

  async getCartItemLineTotal() {
    await this.page.waitForSelector(checkOutLocators.CART_ITEM_LINE_TOTAL);
    const lineTotalText = await this.cartItemLineTotal.first().textContent();
    return parseFloat(lineTotalText.replace('$', '').trim());
  }





}
module.exports = CheckOutOrderPage;