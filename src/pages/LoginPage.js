    const BasePage = require('../BasePage');
    const EnvUtil = require('./../utils/envConfig');
    const baseUrl = EnvUtil.get('BASE_URL');
    const Constants = require('./../utils/Constants');
    const LoginLocators = require('../locators/LoginLocators');
    const { expect } = require('@playwright/test');
const { default: CatalogLocators } = require('../locators/CatalogLocators');
    
    class LoginPage extends BasePage{
      constructor(page) {
        super(page);
        this.emailInput = page.locator(LoginLocators.USERNAME_INPUT);
        this.passwordInput = page.locator(LoginLocators.PASSWORD_INPUT);
        this.loginButton = page.locator(LoginLocators.LOGIN_BUTTON);
      }


      async login(username, password) {
        await this.Navigate(baseUrl+'/index.html');
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForTimeout(2000); // Wait for 2 seconds
      }

      async verifyLoginSuccessful() {
        await expect(this.page.locator(CatalogLocators.CATALOG_TEXT)).toHaveText('Catalog');
        await expect(this.page).toHaveURL(/\/shop\.html$/);
      }

      async verifyLoginFailed() {
          await expect(this.page.locator(LoginLocators.INLINE_ERROR)).toHaveText(LoginLocators.INLINE_ERROR_TEXT);
      }
    }
    module.exports = LoginPage;