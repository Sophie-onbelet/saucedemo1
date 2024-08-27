import { test } from '@playwright/test';
import { products } from '../json/Products.json';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { config } from '../config';
import { Product } from '../models/Product';

test.beforeEach(async ({ page }) => {
  await new LoginPage(page).login(config.validUser, config.password);
});
test.describe('Remove item from cart tests', () => {
  test('Verify that user can remove an item from the cart', async ({ page }) => {
    //Add 1 item to your cart
    const items : Product[] = [products.backpack, products['bike-light']]
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(items);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify item
    await shoppingCartPage.verifyShoppingCart(items);

    //delete item
    await shoppingCartPage.deleteItem(items);
  });
});
