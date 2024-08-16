import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { User } from '../models/User';
import { products } from '../json/products.json';
import { config } from '../config';
import { ProductsPage } from '../pages/ProductsPage';

test.beforeEach(async ({ page }) => {
  await new LoginPage(page).login(config.validUser, config.password);
});

test.describe('test saucedemo website', () => {
  test('Verify that user can complete a purchase', async ({ page }) => {
    const user = new User();

    //Add 1 item to your cart
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(products[0].id);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify item and proceed check out process
    await shoppingCartPage.verifyShoppingCart(products[0].name);
    const yourInformationPage = await shoppingCartPage.checkOutShoppingCart();
    const checkOutOverviewPage = await yourInformationPage.fillCheckOutInformation(user);
    await checkOutOverviewPage.verifyShoppingCart(products[0].name);
    const checkOutCompletePage = await checkOutOverviewPage.checkOutShoppingCart();
    await checkOutCompletePage.checkOrderCompleted();

    //Go back to HomePage
    await checkOutCompletePage.goBackHome();
  });
});
