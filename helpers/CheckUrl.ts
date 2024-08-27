import { Page, expect } from '@playwright/test';

export async function checkCorrectPage(page: Page, urlPart: string) {
  expect(page.url()).toContain(urlPart);
}
