import { test } from '@playwright/test';
import { products } from '@json/Products.json';
import { LoginPage } from '@pages/authentication/LoginPage';  
import { ProductsPage } from '@pages/product-browsing-selecting/ProductsPage';  
import { config } from '@config/config';
import { Product } from '@models/Product';
import { User } from '@models/User';

test.beforeEach(async ({ page }) => {
  await new LoginPage(page).login(config.validUser, config.password);
});

test.describe('Test error messages in your information page', () => {
  test('Verify that user gets error messages', async ({ page }) => {
    const user = new User();
    const items : Product[] = [products['back-pack'], products['bike-light']]
    
    //Add multiple items to your cart
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(items);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify item and proceed check out process
    await shoppingCartPage.verifyShoppingCart(items);
    const yourInformationPage = await shoppingCartPage.checkOutShoppingCart();

    await yourInformationPage.checkInformationErrors(user);
  });
});
