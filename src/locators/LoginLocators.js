class LoginLocators {
  static USERNAME_INPUT = '//input[@data-testid="username"]';
  static PASSWORD_INPUT = '//input[@data-testid="password"]';
  static LOGIN_BUTTON = '//button[@data-testid="login-submit"]';
  static INLINE_ERROR = '//div[@data-testid="login-error"]';
  static INLINE_ERROR_TEXT = 'Invalid credentials. Try: tester / Pass123!';
}

module.exports = LoginLocators;