import { Locator, Page } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage';
import { checkCorrectPage } from '../helpers/CheckUrl';
import { Product } from '../models/Product';

export class ProductsPage {
  private readonly page: Page;
  private readonly productList: Locator;
  private readonly productItem: Locator;
  private readonly productTitle: Locator;
  private readonly productPrice: Locator;
  private readonly addToCartButton: Locator;
  private readonly shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('div[class="inventory_list"]');
    this.productItem = page.locator('div[class="inventory_item"]');
    this.productTitle = page.locator('div[class="inventory_item_name "]');
    this.productPrice = page.locator('div[class="inventory_item_price"]');
    this.addToCartButton = page.locator('button[name="add-to-cart-sauce-labs-backpack"]');
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
