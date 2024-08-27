import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { User } from '../models/User';
import { products } from '../json/Products.json';
import { config } from '../config';
import { ProductsPage } from '../pages/ProductsPage';
import { Product } from '../models/Product';


test.beforeEach(async ({ page }) => {
  await new LoginPage(page).login(config.validUser, config.password);
});

test.describe('test saucedemo website', () => {
  test('Verify that user can complete a purchase', async ({ page }) => {
    const user = new User();
    const items : Product[] = [products.backpack, products['bike-light']]
    //Add 1 item to your cart
    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart(items);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify item and proceed check out process
    await shoppingCartPage.verifyShoppingCart(items);
    const yourInformationPage = await shoppingCartPage.checkOutShoppingCart();
    const checkOutOverviewPage = await yourInformationPage.fillCheckOutInformation(user);
    await checkOutOverviewPage.verifyShoppingCart(products.backpack.name);
    const checkOutCompletePage = await checkOutOverviewPage.checkOutShoppingCart();
    await checkOutCompletePage.checkOrderCompleted();

    //Go back to HomePage
    await checkOutCompletePage.goBackHome();
  });
});
