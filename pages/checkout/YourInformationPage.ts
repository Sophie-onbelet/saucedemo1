import { Locator, Page, expect } from '@playwright/test';
import { User } from '@models/User';
import { CheckOutOverview } from '@pages/checkout/OverviewPage';
import { ErrorMessages } from '@data/ErrorMessages/ErrorMessages';
import { checkCorrectPage } from '@helpers/CheckUrl';

export class YourInformationPage {
  private readonly page: Page;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly errorMessage: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('input[id="first-name"]');
    this.lastName = page.locator('input[id="last-name"]');
    this.postalCode = page.locator('input[id="postal-code"]');
    this.errorMessage = page.locator('div[class="error-message-container error"]');
    this.continueButton = page.locator('input[id="continue"]');
  }

  async fillCheckOutInformation(user: User) {
    await checkCorrectPage(this.page, 'checkout-step-one.html');
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.postalCode.fill(user.postalCode);
    await this.continueButton.click();
    return new CheckOutOverview(this.page);
  }

  async checkInformationErrors(user: User) {
    await this.leaveOutFirstName();
    await this.leaveOutLastName(user);
    await this.leaveOutPostalCode(user);
  }

  async leaveOutFirstName() {
    await this.continueButton.click();
    await expect(this.errorMessage).toHaveText(ErrorMessages.firstName);
  }

  async leaveOutLastName(user: User) {
    await this.firstName.fill(user.firstName);
    await this.continueButton.click();
    await expect(this.errorMessage).toHaveText(ErrorMessages.lastName);
  }
  async leaveOutPostalCode(user: User) {
    await this.lastName.fill(user.lastName);
    await this.continueButton.click();
    await expect(this.errorMessage).toHaveText(ErrorMessages.postalCode);
  }
}
