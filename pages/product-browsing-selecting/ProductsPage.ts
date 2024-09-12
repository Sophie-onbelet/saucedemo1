import { Locator, Page } from '@playwright/test';
import { ShoppingCartPage } from '@pages/product-browsing-selecting/ShoppingCartPage';
import { checkCorrectPage } from '@helpers/CheckUrl';
import { Product } from '@models/Product';

export class ProductsPage {
  private readonly page: Page;
  private readonly productTitle: Locator;
  private readonly productPrice: Locator;
  private readonly shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('div[class="inventory_item_name "]');
    this.productPrice = page.locator('div[class="inventory_item_price"]');
    this.shoppingCart = page.locator('a[class="shopping_cart_link"]');
  }

  async getProductTitles() {
    await checkCorrectPage(this.page, 'inventory.html');
    return this.productTitle.allTextContents();
  }

  async getProductPrices() {
    return this.productPrice.allTextContents();
  }

  async addProductToCart(items: Product[]) {
    for (const item of items) {
      const productSelector: Locator = this.page.locator(item.selector);
      await productSelector.click();
    }
  }

  async goToShoppingCart() {
    await this.shoppingCart.click();
    return new ShoppingCartPage(this.page);
  }
}
