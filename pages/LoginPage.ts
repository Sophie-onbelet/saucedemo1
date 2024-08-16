import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
export class LoginPage extends BasePage {
  username: Locator;
  password: Locator;
  submit: Locator;
  errorMessageLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('input[name="user-name"]');
    this.password = page.locator('input[name="password"]');
    this.submit = page.locator('input[id="login-button"]');
    this.errorMessageLocator = page.locator('[data-test="error"]');
  }

  async login(username: string, password: string) {
    await this.page.goto('https://www.saucedemo.com/');
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }

  async validateLoginErrorMessage(message: string) {
    await this.validateErrorMessage(this.errorMessageLocator, message);
  }
}