class AdminPage {
  constructor(page) {
    this.page = page;
    this.adminMenuLink = page.getByRole('link', { name: 'Admin' });
    this.addButton = page.getByRole('button', { name: ' Add' });
    this.usernameSearchInput = page.getByRole('textbox').nth(1);
  }

  async navigateToAdminModule() {
    await this.adminMenuLink.click();
    await this.page.waitForTimeout(3000);
  }

  async clickAddButton() {
    await this.addButton.click();
    await this.page.waitForTimeout(2000);
  }

  async searchUser(username) {
    await this.usernameSearchInput.clear();
    await this.usernameSearchInput.fill(username);
    await this.page.waitForTimeout(1000);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(3000);
  }

  async searchUserWithFilters(username, employeeName) {
    // Fill username
    await this.usernameSearchInput.clear();
    await this.usernameSearchInput.fill(username);

    // Select User Role - Admin
    await this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
    await this.page.getByRole('option', { name: 'Admin' }).click();

    // Fill Employee Name
    await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(employeeName.substring(0, 5));
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option', { name: employeeName }).click();

    // Select Status - Enabled
    await this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').nth(1).click();
    await this.page.getByRole('option', { name: 'Enabled' }).click();

    await this.page.waitForTimeout(1000);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(3000);
  }

  async clickEditButton(username) {
    await this.page.getByRole('row', { name: new RegExp(username) })
      .getByRole('button').nth(1).click();
    await this.page.waitForTimeout(2000);
  }

  async clickDeleteButton(username) {
    await this.page.getByRole('row', { name: new RegExp(username) })
      .getByRole('button').nth(0).click();
    await this.page.waitForTimeout(1000);
  }

  async confirmDelete() {
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    await this.page.waitForTimeout(3000);
  }
}

module.exports = { AdminPage };