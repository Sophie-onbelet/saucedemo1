import { Page } from "@playwright/test";
import { products } from '../json/products.json';
import { LoginPage } from "../pages/loginPage";

export async function checkCorrectPage(urlPart: string) {
    const currentUrl = this.page.url();
    currentUrl.includes(urlPart)
    }
  

    export async function informationForm(page: Page) {
        const loginPage = new LoginPage(page);
    
        //Login with standard user
        await loginPage.goToSaucePage();
        const productsPage = await loginPage.fillLogin(process.env.STANDARD_USER!, process.env.PASSWORD!);
    
        //Add 1 item to your cart
        await productsPage.checkCorrectPage();
        await productsPage.addProductToCart(products[0].id);
        const shoppingCartPage = await productsPage.goToShoppingCart();
    
        //Verify item and proceed check out process
        await shoppingCartPage.verifyShoppingCart(products[0].name);
        await shoppingCartPage.checkOutShoppingCart();
    }