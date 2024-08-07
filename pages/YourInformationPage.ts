import { Locator, Page, expect } from '@playwright/test';
import { User } from '../models/User';
import { CheckOutOverview } from '../pages/OverviewPage';
import { errorMessages } from '../data/error-messages/error-messages';
import { checkCorrectPage } from '../helpers/CheckUrl';

export class YourInformationPage {
  page: Page;
  firstName: Locator;
  lastName: Locator;
  postalCode: Locator;
  errorMessage: Locator;
  continueButton: Locator;

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
    await expect(this.errorMessage).toHaveText(errorMessages.Firstname);
  }

  async leaveOutLastName(user: User) {
    await this.firstName.fill(user.firstName);
    await this.continueButton.click();
    await expect(this.errorMessage).toHaveText(errorMessages.Lastname);
  }
  async leaveOutPostalCode(user: User) {
    await this.lastName.fill(user.lastName);
    await this.continueButton.click();
    await expect(this.errorMessage).toHaveText(errorMessages.Postalcode);
  }
}
