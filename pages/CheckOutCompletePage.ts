import { Locator, Page, expect } from '@playwright/test';
import { succesMessages } from '../data/checkout-messages/succes-messages';

export class CheckOutCompletePage {
  page: Page;
  checkOutTitle: Locator;
  completedContainer: Locator;
  completeHeader: Locator;
  completeText: Locator;
  backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkOutTitle = page.locator('span[class="title"]');
    this.completedContainer = page.locator('div[id="checkout_complete_container"]');
    this.completeHeader = page.locator('h2[class="complete-header"]');
    this.completeText = page.locator('div[class="complete-text"]');
    this.backHomeButton = page.locator('button[id="back-to-products"]');
  }

  async checkCorrectPage() {
    const currentUrl = this.page.url();
    const expectedUrl = 'https://www.saucedemo.com/checkout-complete.html';
    if (currentUrl !== expectedUrl) {
      return false;
    }
  }

  async checkOrderCompleted() {
    await expect(this.checkOutTitle).toHaveText(succesMessages.Complete);
    await expect(this.completedContainer).toBeVisible();
    await expect(this.completeHeader).toHaveText(succesMessages.Thankyou);
    await expect(this.completeText).toHaveText(succesMessages.Dispatch);
  }

  async goBackHome() {
    await this.backHomeButton.click();
  }
}
