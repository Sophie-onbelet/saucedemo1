import { Locator, Page, expect } from '@playwright/test';
import { SuccesMessages } from '@data/CheckoutMessages/SuccesMessages';
import { checkCorrectPage } from '@helpers/CheckUrl';

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
    await expect(this.checkOutTitle).toHaveText(SuccesMessages.complete);
    await expect(this.completedContainer).toBeVisible();
    await expect(this.completeHeader).toHaveText(SuccesMessages.thankYou);
    await expect(this.completeText).toHaveText(SuccesMessages.dispatch);
  }

  async goBackHome() {
    await this.backHomeButton.click();
  }
}
