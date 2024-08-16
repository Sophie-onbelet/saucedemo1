import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validateErrorMessage(messageLocator: Locator, errorMessage: string) {
    await expect(messageLocator, "Error message should be visible").toBeVisible();
    await expect(messageLocator, "Error message should be the expected one").toHaveText(errorMessage);
  }

}