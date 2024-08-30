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
    const items: Product[] = [products.backpack, products['bike-light']];

    //Add multiple items to your cart
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(items);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify items
    await shoppingCartPage.verifyShoppingCart(items);

    //Delete items
    await shoppingCartPage.deleteItem(items);
  });
});
