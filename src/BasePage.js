const Constants = require('./utils/Constants');


class BasePage {
  constructor(page) {
    this.page = page;
  }

  async fill(selector, value, screenshotName = 'fill-error.png') {
    try {
      await this.page.locator(selector).fill(value);
    } catch (error) {
      await this.page.screenshot({ path: Constants.SCREENSHOT_PATH + screenshotName, fullPage: true });
      throw error;
    }
  }

  async click(selector, screenshotName = 'click-error.png') {
    try {
      await this.page.locator(selector).click();
    } catch (error) {
      await this.page.screenshot({ path: Constants.SCREENSHOT_PATH + screenshotName, fullPage: true });
      throw error;
    }
  }

  async Navigate(baseUrl,screenshotName="navigate-error.png") {
    try{
        await this.page.goto(baseUrl); // Replace with your actual login URL
    }   
    catch(error){
        await this.page.screenshot({ path: Constants.SCREENSHOT_PATH + screenshotName, fullPage: true });
      throw error;
    }
  }

  async isLoggedIn(timeout = 5000, successSelector, expectedText, exactMatch = false) {
    if (!successSelector) throw new Error('isLoggedIn requires a selector or Locator as successSelector');
    try {
      const locator = this.page.locator(successSelector);
      await locator.waitFor({ timeout });
      const actualText = (await locator.innerText()).trim();
      console.log("Actual text:", actualText);
      console.log("Expected text:", expectedText);

      // If no expected text is provided, simply return true
      if (expectedText === undefined || expectedText === null) {
        return true;
      }
      return true
      ? actualText === expectedText
      : false;
    } catch (error) {
      // capture screenshot on failure and return false
      await this.page.screenshot({ path: Constants.SCREENSHOT_PATH + 'isLoggedIn-fail.png', fullPage: true });
      return false;
    }
  }

  async waitForSelector(selector, timeout = 5000, screenshotName = 'wait-error.png') {
    try {
      await this.page.waitForSelector(selector, { timeout });
    } catch (error) {
      await this.page.screenshot({ path: Constants.SCREENSHOT_PATH + screenshotName, fullPage: true });
      throw error;
    }
  }

  async screenshot(path = 'error.png') {
    await this.page.screenshot({ path, fullPage: true });
  }
}

module.exports = BasePage;