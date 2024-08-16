import { test } from '@playwright/test';
import { products } from '../json/products.json';
import { LoginPage } from '../pages/LoginPage';
import { User } from '../models/User';
import { ProductsPage } from '../pages/ProductsPage';
import { config } from '../config';

test.beforeEach(async ({ page }) => {
  await new LoginPage(page).login(config.validUser, config.password);
});

test.describe('test error messages in your information page', () => {
  test('Verify that user gets error messages', async ({ page }) => {
    const user = new User();

    //Add 1 item to your cart
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(products[0].id);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify item and proceed check out process
    await shoppingCartPage.verifyShoppingCart(products[0].name);
    const yourInformationPage = await shoppingCartPage.checkOutShoppingCart();

    await yourInformationPage.checkInformationErrors(user);
  });
});
