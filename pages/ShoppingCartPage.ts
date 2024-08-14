import { Locator, Page, expect } from '@playwright/test';
import { YourInformationPage } from './YourInformationPage';
import { checkCorrectPage } from '../helpers/CheckUrl';

export class ShoppingCartPage {
  page: Page;
  inventoryItem: Locator;
  checkOut: Locator;
  removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItem = page.locator('div[class="inventory_item_name"]');
    this.checkOut = page.locator('button[id="checkout"]');
    this.removeButton = page.locator('button[id="remove-$products.id"]');
  }

  async verifyShoppingCart(product: string) {
    checkCorrectPage(this.page, 'cart.html');
    const productNameInCart = await this.page.locator('div[class="inventory_item_name"]').textContent();

    // Verify the product name
    expect(productNameInCart).toBe(product);
  }

  async deleteItem(productId: string) {
    const removeButton = this.page.locator(`button[id="remove-${productId}"]`);
    await removeButton.click();

    // Verify that the remove button doesn't exists
    await expect(removeButton).toHaveCount(0);
  }

  async checkOutShoppingCart() {
    await this.checkOut.click();
    return new YourInformationPage(this.page);
  }
}
