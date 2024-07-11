import { Locator, Page, expect } from '@playwright/test';
import { CheckOutCompletePage } from './CheckOutCompletePage';
import { checkCorrectPage } from '../helpers/helpers';

export class CheckOutOverview {
  page: Page;
  inventoryItem: Locator;
  finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItem = page.locator('div[class="inventory_item_name"]');
    this.finishButton = page.locator('button[id="finish"]');
  }

  //async checkCorrectPage(page: string);

  // async checkCorrectPage() {
  //   const currentUrl = this.page.url();
  //   const expectedUrl = 'https://www.saucedemo.com/checkout-step-two.html';
  //   if (currentUrl !== expectedUrl) {
  //     return false;
  //   }
  // }

  async verifyShoppingCart(product: string) {
   await checkCorrectPage(this.page, 'checkout-step-two.html');

    const productNameInCart = await this.page.locator('div[class="inventory_item_name"]').textContent();

    // Verify the product name
    expect(productNameInCart).toBe(product);
  }

  async checkOutShoppingCart() {
    await this.finishButton.click();
    return new CheckOutCompletePage(this.page);
  }
}
