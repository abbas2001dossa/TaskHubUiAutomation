const BasePage = require('../BasePage');
const EnvUtil = require('../utils/envConfig');
const baseUrl = EnvUtil.get('BASE_URL');
const Constants = require('../utils/Constants');
const LoginLocators = require('../locators/LoginLocators');
const { expect } = require('@playwright/test');
const catalogLocators = require('../locators/CatalogLocators');


class CheckOutOrderPage extends BasePage {
  constructor(page) {
    super(page);
    
  }


  
}
module.exports = CheckOutOrderPage;