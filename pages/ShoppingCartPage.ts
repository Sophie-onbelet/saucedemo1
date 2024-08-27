import { Locator, Page, expect } from '@playwright/test';
import { YourInformationPage } from './YourInformationPage';
import { checkCorrectPage } from '../helpers/CheckUrl';
import { Product } from '../models/Product';

export class ShoppingCartPage {
  private readonly page: Page;
  private readonly inventoryItem: Locator;
  private readonly checkOut: Locator;
  private readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItem = page.locator('div[class="inventory_item_name"]');
    this.checkOut = page.locator('button[id="checkout"]');
    this.removeButton = page.locator('button[id="remove-$products.id"]');
  }

  async verifyShoppingCart(items: Product[]) {
    checkCorrectPage(this.page, 'cart.html');
    for (const item of items) {
    const productNameInCart = this.page.locator(`div[class="inventory_item_name"]`, { hasText: item.name }) //previous locator matched both elemenst
    expect(productNameInCart).toHaveText(item.name);
    }
  }

  async deleteItem(items: Product[]) {
    for (const item of items) {
    const removeButton = this.page.locator(`button[id="remove-${item.id}"]`);
    await removeButton.click();
    await expect(removeButton).toHaveCount(0);
    }
    // Verify that the remove button doesn't exists
    
  }

  async checkOutShoppingCart() {
    await this.checkOut.click();
    return new YourInformationPage(this.page);
  }
}
