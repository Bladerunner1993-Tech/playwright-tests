class GaragePage {
  constructor(page) {
    this.page = page;
    this.addCarBtn = page.getByRole('button', { name: 'Add car' });
    this.heading = page.getByRole('heading', { name: 'Garage' });
  }

  async open() {
    await this.page.goto('/panel/garage');
  }
}

module.exports = { GaragePage };
