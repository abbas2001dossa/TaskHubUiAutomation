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
    this.promoCodeInput = page.locator(checkOutLocators.PROMO_CODE_INPUT);
    this.applyPromoButton = page.locator(checkOutLocators.APPLY_PROMO_BUTTON);

    //totals
    this.subtotalAmount = page.locator(checkOutLocators.SUBTOTAL_AMOUNT);
    this.promoAmount = page.locator(checkOutLocators.PROMO_AMOUNT);
    this.totalAmount = page.locator(checkOutLocators.TOTAL_AMOUNT);
    this.shippingAmount = page.locator(checkOutLocators.SHIPPING_AMOUNT);
    this.taxAmount = page.locator(checkOutLocators.TAX_AMOUNT);

    //required fields
    this.fullNameInput = page.locator(checkOutLocators.FULL_NAME_INPUT);
    this.emailInput = page.locator(checkOutLocators.EMAIL_INPUT);
    this.addressInput = page.locator(checkOutLocators.ADDRESS_INPUT);
    this.paymentMethodDropdown = page.locator(checkOutLocators.PAYMENT_METHOD_DROPDOWN);
    this.formErrorMessage = page.locator(checkOutLocators.FORM_ERROR_MESSAGE);
    this.placeOrderButton = page.locator(checkOutLocators.PLACE_ORDER_BUTTON);
  }

  async getCartItemPrice() {
    await this.page.waitForSelector(checkOutLocators.CART_ITEM_PRICE);
    const priceText = await this.cartItemPrice.first().textContent();
    return parseFloat(priceText.replace('$', '').trim());
  }

  async getGenericItemPrice(itemLocator) {
    await this.page.waitForSelector(itemLocator);
    const priceText = await this.page.locator(itemLocator).first().textContent();
    const cleaned = priceText.replace(/[^0-9.\-]/g, '');
    const numeric = parseFloat(cleaned);
    // always return a non-negative amount 
    const value = isNaN(numeric) ? 0 : numeric;
    return Math.abs(value);
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

  async applyPromoCode() {
    await this.promoCodeInput.fill(Constants.PROMO_CODE);
    await this.applyPromoButton.click();
    await this.page.waitForTimeout(3000);
  }

  async getFormErrorMessage() {
    await this.page.waitForSelector(checkOutLocators.FORM_ERROR_MESSAGE);
    return await this.formErrorMessage.textContent();
  }

  async fillRequiredFields(fullName, email, address, paymentMethod) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.addressInput.fill(address);
    await this.paymentMethodDropdown.selectOption(paymentMethod);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    await this.page.waitForTimeout(3000);
  }

}
module.exports = CheckOutOrderPage;