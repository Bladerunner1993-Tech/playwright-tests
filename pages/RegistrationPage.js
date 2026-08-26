class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.signUpBtn = page.getByRole('button', { name: 'Sign up' });
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerBtn = page.locator('ngb-modal-window').getByRole('button', { name: 'Register' });
  }

  async open() {
    await this.page.goto('https://qauto.forstudy.space/');
    await this.signUpBtn.click();
  }

  async fillName(value) {
    await this.nameInput.fill(value);
  }

  async fillLastName(value) {
    await this.lastNameInput.fill(value);
  }

  async fillEmail(value) {
    await this.emailInput.fill(value);
  }

  async fillPassword(value) {
    await this.passwordInput.fill(value);
  }

  async fillRepeatPassword(value) {
    await this.repeatPasswordInput.fill(value);
  }

  async register() {
    await this.registerBtn.click();
  }

  async registerNewUser(name, lastName, email, password) {
    await this.fillName(name);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.fillRepeatPassword(password);
    await this.register();
  }
}

module.exports = { RegistrationPage };
