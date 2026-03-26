class UserFormPage {
  constructor(page) {
    this.page = page;
    this.userRoleDropdown = page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2);
    this.statusDropdown = page.getByText('-- Select --');
    this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' });
    this.usernameInput = page.getByRole('textbox').nth(2);
    this.passwordInput = page.getByRole('textbox').nth(3);
    this.confirmPasswordInput = page.getByRole('textbox').nth(4);
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async fillAddUserForm(userRole, employeeName, status, username, password) {
    await this.userRoleDropdown.click();
    await this.page.getByRole('option', { name: userRole }).click();

    await this.employeeNameInput.fill(employeeName.substring(0, 5));
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('option', { name: employeeName }).click();

    await this.statusDropdown.click();
    await this.page.getByRole('option', { name: status }).click();

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async fillEditUserForm(updatedUsername) {
    await this.usernameInput.clear();
    await this.usernameInput.fill(updatedUsername);
  }

  async save() {
    await this.saveButton.click();
    await this.page.waitForTimeout(3000);
  }
}

module.exports = { UserFormPage };