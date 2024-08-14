import { test } from '@playwright/test';
import { products } from '../json/products.json';
import { LoginPage } from '../pages/LoginPage';

test.describe('Remove item from cart tests', () => {
  test('Verify that user can remove an item from the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);

    //Login with standard user
    await loginPage.goToSaucePage();
    const productsPage = await loginPage.fillLogin(process.env.STANDARD_USER!, process.env.PASSWORD!);

    //Add 1 item to your cart
    await productsPage.addProductToCart(products[0].id);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify item
    await shoppingCartPage.verifyShoppingCart(products[0].name);

    //delete item
    await shoppingCartPage.deleteItem(products[0].id);
  });
});
