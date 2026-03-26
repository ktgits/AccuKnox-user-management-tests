const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { AdminPage } = require('../pages/AdminPage');
const { UserFormPage } = require('../pages/UserFormPage');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const NEW_USERNAME = process.env.NEW_USERNAME;
const UPDATED_USERNAME = process.env.UPDATED_USERNAME;
const EMPLOYEE_NAME = process.env.EMPLOYEE_NAME;
const NEW_USER_PASSWORD = process.env.NEW_USER_PASSWORD;

test.describe('OrangeHRM User Management - End to End Flow', () => {

  test('Complete User Management Flow', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const adminPage = new AdminPage(page);
    const userFormPage = new UserFormPage(page);

    await test.step('TC_OHR_001 - Login with valid credentials', async () => {
      await loginPage.goto();
      await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 15000 });
    });

    await test.step('TC_OHR_002 - Navigate to Admin Module', async () => {
      await adminPage.navigateToAdminModule();
      await expect(adminPage.addButton).toBeVisible({ timeout: 15000 });
    });

    await test.step('TC_OHR_003 - Add a new user', async () => {
      await adminPage.clickAddButton();
      await userFormPage.fillAddUserForm(
        'Admin',
        EMPLOYEE_NAME,
        'Enabled',
        NEW_USERNAME,
        NEW_USER_PASSWORD
      );
      await userFormPage.save();
      await expect(adminPage.addButton).toBeVisible({ timeout: 15000 });
    });
    

    await test.step('TC_OHR_004 - Edit user details', async () => {
      await adminPage.clickEditButton(NEW_USERNAME);
      await userFormPage.fillEditUserForm(UPDATED_USERNAME);
      await userFormPage.save();
      await expect(adminPage.addButton).toBeVisible({ timeout: 15000 });
    });

    await test.step('TC_OHR_005 - Validate updated user details', async () => {
    await adminPage.searchUserWithFilters(UPDATED_USERNAME, EMPLOYEE_NAME);
    await expect(page.getByRole('cell', { name: UPDATED_USERNAME, exact: true })).toBeVisible({ timeout: 10000 });
    });

    await test.step('TC_OHR_006 - Delete the user', async () => {
      await adminPage.clickDeleteButton(UPDATED_USERNAME);
      await expect(page.getByText('Are you Sure?')).toBeVisible();
      await adminPage.confirmDelete();
      await adminPage.searchUser(UPDATED_USERNAME);
      await page.waitForTimeout(3000);
      await expect(page.getByText('No Records Found')).toBeVisible();
    });

  });
});