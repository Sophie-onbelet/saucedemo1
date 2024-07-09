import test from '@playwright/test';
import { products } from '../json/products.json';
import { LoginPage } from '../pages/loginPage';
import { User } from '../models/User';

test.describe('test error messages in your information page', () => {
  test('Verify that user get first name error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = new User();

    //Login with standard user
    await loginPage.goToSaucePage();
    const productsPage = await loginPage.fillLogin(process.env.STANDARD_USER!, process.env.PASSWORD!);

    //Add 1 item to your cart
    await productsPage.checkCorrectPage();
    await productsPage.addProductToCart(products[0].id);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify item and proceed check out process
    await shoppingCartPage.verifyShoppingCart(products[0].name);
    const YourInformationPage = await shoppingCartPage.checkOutShoppingCart();

    await YourInformationPage.leaveOutFirstName(user);
  });

  test('Verify that user get last name error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = new User();

    //Login with standard user
    await loginPage.goToSaucePage();
    const productsPage = await loginPage.fillLogin(process.env.STANDARD_USER!, process.env.PASSWORD!);

    //Add 1 item to your cart
    await productsPage.checkCorrectPage();
    await productsPage.addProductToCart(products[0].id);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify item and proceed check out process
    await shoppingCartPage.verifyShoppingCart(products[0].name);
    const YourInformationPage = await shoppingCartPage.checkOutShoppingCart();

    await YourInformationPage.leaveOutLastName(user);
  });

  test('Verify that user get postal code error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = new User();

    //Login with standard user
    await loginPage.goToSaucePage();
    const productsPage = await loginPage.fillLogin(process.env.STANDARD_USER!, process.env.PASSWORD!);

    //Add 1 item to your cart
    await productsPage.checkCorrectPage();
    await productsPage.addProductToCart(products[0].id);
    const shoppingCartPage = await productsPage.goToShoppingCart();

    //Verify item and proceed check out process
    await shoppingCartPage.verifyShoppingCart(products[0].name);
    const YourInformationPage = await shoppingCartPage.checkOutShoppingCart();

    await YourInformationPage.leaveOutPostalCode(user);
  });
});
