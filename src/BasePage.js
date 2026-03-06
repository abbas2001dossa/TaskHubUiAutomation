const Constants = require('./utils/Constants');


class BasePage {
  constructor(page) {
    this.page = page;
    this.stepCounter = 0; // Counter to track action steps
  }

  // Helper method to generate unique screenshot names
  async takeStepScreenshot(stepName = 'step') {
    this.stepCounter++;
    const timestamp = new Date().getTime();
    const screenshotName = `${this.stepCounter.toString().padStart(3, '0')}_${stepName}_${timestamp}.png`;
    try {
      await this.page.screenshot({ path: Constants.SCREENSHOT_PATH + screenshotName, fullPage: true });
      console.log(`[Screenshot] ${screenshotName}`);
    } catch (error) {
      console.warn(`Failed to capture screenshot: ${screenshotName}`, error.message);
    }
  }

  async fill(selector, value, screenshotName = 'fill-error.png') {
    try {
      await this.page.locator(selector).fill(value);
      // Take screenshot after successful fill action
      await this.takeStepScreenshot(`fill-${value.substring(0, 10)}`);
    } catch (error) {
      await this.page.screenshot({ path: Constants.SCREENSHOT_PATH + screenshotName, fullPage: true });
      throw error;
    }
  }

  async click(selector, screenshotName = 'click-error.png') {
    try {
      await this.page.locator(selector).click();
      // Take screenshot after successful click action
      await this.takeStepScreenshot('click');
    } catch (error) {
      await this.page.screenshot({ path: Constants.SCREENSHOT_PATH + screenshotName, fullPage: true });
      throw error;
    }
  }

  async Navigate(baseUrl, screenshotName="navigate-error.png") {
    try {
      await this.page.goto(baseUrl); // Replace with your actual login URL
      // Take screenshot after successful navigation
      await this.takeStepScreenshot('navigate');
    } catch (error) {
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
        await this.takeStepScreenshot('login-success');
        return true;
      }
      const isLoggedIn = actualText === expectedText ? true : false;
      if (isLoggedIn) {
        await this.takeStepScreenshot('login-success');
      }
      return isLoggedIn;
    } catch (error) {
      // capture screenshot on failure and return false
      await this.page.screenshot({ path: Constants.SCREENSHOT_PATH + 'isLoggedIn-fail.png', fullPage: true });
      return false;
    }
  }

  async waitForSelector(selector, timeout = 5000, screenshotName = 'wait-error.png') {
    try {
      await this.page.waitForSelector(selector, { timeout });
      // Take screenshot after element appears
      await this.takeStepScreenshot('wait-element');
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