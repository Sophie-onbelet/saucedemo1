import { test } from '@playwright/test';
import { products } from '../json/products.json';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { config } from '../config';

test.beforeEach(async ({ page }) => {
  await new LoginPage(page).login(config.validUser, config.password);
});
test.describe('Remove item from cart tests', () => {
  test('Verify that user can remove an item from the cart', async ({ page }) => {
    //Add 1 item to your cart
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(products[0].id);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify item
    await shoppingCartPage.verifyShoppingCart(products[0].name);

    //delete item
    await shoppingCartPage.deleteItem(products[0].id);
  });
});
