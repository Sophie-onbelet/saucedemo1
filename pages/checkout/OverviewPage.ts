import { Locator, Page, expect } from '@playwright/test';
import { CheckOutCompletePage } from '@pages/checkout/CheckOutCompletePage';
import { checkCorrectPage } from '@helpers/CheckUrl';
import { Product } from '@models/Product';

export class CheckOutOverview {
  private readonly page: Page;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('button[id="finish"]');
  }

  async verifyFinalOrder(items: Product[]) {
    await checkCorrectPage(this.page, 'checkout-step-two.html');
    for (const item of items) {
      const productNameInCart = this.page.locator(`div[class="inventory_item_name"]`, { hasText: item.name });

      expect(productNameInCart).toHaveText(item.name);
    }
  }

  async checkOutShoppingCart() {
    await this.finishButton.click();
    return new CheckOutCompletePage(this.page);
  }
}
