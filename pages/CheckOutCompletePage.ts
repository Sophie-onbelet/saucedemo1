import { Locator, Page, expect } from '@playwright/test';
import { succesMessages } from '../data/checkout-messages/SuccesMessages';
import { checkCorrectPage } from '../helpers/CheckUrl';

export class CheckOutCompletePage {
  private readonly page: Page;
  private readonly checkOutTitle: Locator;
  private readonly completedContainer: Locator;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkOutTitle = page.locator('span[class="title"]');
    this.completedContainer = page.locator('div[id="checkout_complete_container"]');
    this.completeHeader = page.locator('h2[class="complete-header"]');
    this.completeText = page.locator('div[class="complete-text"]');
    this.backHomeButton = page.locator('button[id="back-to-products"]');
  }

  async checkOrderCompleted() {
    await checkCorrectPage(this.page, 'checkout-complete.html');
    await expect(this.checkOutTitle).toHaveText(succesMessages.Complete);
    await expect(this.completedContainer).toBeVisible();
    await expect(this.completeHeader).toHaveText(succesMessages.Thankyou);
    await expect(this.completeText).toHaveText(succesMessages.Dispatch);
  }

  async goBackHome() {
    await this.backHomeButton.click();
  }
}
