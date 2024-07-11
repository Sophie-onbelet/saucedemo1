import { Locator, Page, expect } from '@playwright/test';
import { YourInformationPage } from './YourInformationPage';
import { checkCorrectPage } from '../helpers/CheckUrl';

export class ShoppingCartPage {
  page: Page;
  inventoryItem: Locator;
  checkOut: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItem = page.locator('div[class="inventory_item_name"]');
    this.checkOut = page.locator('button[id="checkout"]');
  }

  async verifyShoppingCart(product: string) {
    checkCorrectPage(this.page, 'cart.html');
    const productNameInCart = await this.page.locator('div[class="inventory_item_name"]').textContent();

    // Verify the product name
    expect(productNameInCart).toBe(product);
  }

  async checkOutShoppingCart() {
    await this.checkOut.click();
    return new YourInformationPage(this.page);
  }
}


