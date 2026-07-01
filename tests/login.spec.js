const { test, expect } = require("@playwright/test");

test("user can login with valid credentials", async ({ page }) => {
  // Step 1: Open login page
  await page.goto("https://the-internet.herokuapp.com/login");

  // Step 2: Enter username
  await page.locator("#username").fill("tomsmith");

  // Step 3: Enter password
  await page.locator("#password").fill("SuperSecretPassword!");

  // Step 4: Click login button
  await page.locator("button[type='submit']").click();

  // Step 5: Verify successful login
  await expect(page.locator("#flash")).toContainText("You logged into a secure area!");

  // Step 6: Verify URL changed to secure page
  await expect(page).toHaveURL(/secure/);
});

test("user cannot login with invalid password", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");

  await page.locator("#username").fill("tomsmith");
  await page.locator("#password").fill("wrongpassword");
  await page.locator("button[type='submit']").click();

  await expect(page.locator("#flash")).toContainText("Your password is invalid!");
});

