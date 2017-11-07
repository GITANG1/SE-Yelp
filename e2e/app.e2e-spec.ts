import { browser, element, by, Key, ExpectedConditions } from 'protractor';
import { RegistrationPage } from './registration.po';
import { LoginPage } from './login.po';
import { HomePage } from './home.po';
import { AppPage } from './app.po';

describe('Gulp', () => {
  let regPage: RegistrationPage;
  let loginPage: LoginPage;
  let homePage: HomePage;
  let username_input;

  describe('Registration page for a new user', () => {
    beforeEach(() => {
      regPage = new RegistrationPage();
      regPage.navigateTo();
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    it('should display all input fields', () => {
      expect(regPage.getFullNameInput()).toBeTruthy();
      expect(regPage.getUserNameInput()).toBeTruthy();
      expect(regPage.getEmailInput()).toBeTruthy();
      expect(regPage.getPasswordInput()).toBeTruthy();
    });

    it('should submit a valid form', () => {
      let fullname = regPage.getFullNameInput();
      fullname.sendKeys('Srishti Hunjan');

      let username = regPage.getUserNameInput();
      username_input = 'shunjantest' + 2;
      username.sendKeys(username_input);

      let email = regPage.getEmailInput();
      email.sendKeys('shunjantest@gmail.com');

      let password = regPage.getPasswordInput();
      password.sendKeys('password');

      let regBtn = regPage.getRegisterButton();
      regBtn.click();
    });
  });

  describe('Login page for a existing user', () => {
    beforeEach(() => {
      loginPage = new LoginPage();
      loginPage.navigateTo();
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it('should display all the input fields', () => {
      expect(loginPage.getUserNameInput()).toBeTruthy();
      expect(loginPage.getPasswordInput()).toBeTruthy();
    });

    it('grants access when valid credentials are entered', () => {
      let username = regPage.getUserNameInput();
      let password = regPage.getPasswordInput();

      username.sendKeys(username_input);
      password.sendKeys('password');

      expect(username.getAttribute('value')).toEqual(username_input);
      expect(password.getAttribute('value')).toEqual('password');

      let loginBtn = loginPage.getLoginButton();

      loginBtn.click().then(function () {
        browser.sleep(2000);
      });
    });
  });

  describe('Home page for existing user', () => {
    beforeEach(() => {
      homePage = new HomePage();
      homePage.navigateTo();
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it('should display all input fields', () => {
      expect(homePage.getRestaurantNameInput()).toBeTruthy();
      expect(homePage.getLocationInput()).toBeTruthy();
    });

    it('should display all available restaurants for user-specified query', () => {
      let breakfastBtn = homePage.getBreakfastButton();

      browser.sleep(2000);
      breakfastBtn.click().then(function () {
        browser.sleep(2000);
      });

    });
  });

  /**
   * To be done - Implement Logout for logged in user
   */
});
