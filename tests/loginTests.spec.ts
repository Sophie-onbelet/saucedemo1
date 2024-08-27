import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Test saucedemo website logins', () => {
  test('Verify that the user gets locked out message', async ({ page }) => {
    const credentials = {
      username: 'locked_out_user',
      password: 'secret_sauce',
    };
    const errorText = 'Epic sadface: Sorry, this user has been locked out.';

    const loginPage = new LoginPage(page);
    await loginPage.login(credentials.username, credentials.password);

    await loginPage.validateLoginErrorMessage(errorText);
  });
});
