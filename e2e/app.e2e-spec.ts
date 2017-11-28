/**
 * File name : app.e2e-spec.ts
 * @author Srishti Hunjan
 */
import { browser, element, by, Key, ExpectedConditions } from 'protractor';
import { RegistrationPage } from './registration.po';
import { LoginPage } from './login.po';
import { HomePage } from './home.po';
import { AppPage } from './app.po';
import { ProfilePage } from './profile.po';
import { RestaurantPage } from './restaurant.po';

/**
 * E2E tests for the entire site
 */
describe('Gulp', () => {
  let regPage: RegistrationPage;
  let loginPage: LoginPage;
  let homePage: HomePage;
  let profilePage: ProfilePage;
  let restPage: RestaurantPage;
  let username_input;
  let window: Window;

  /**
   * Describe for Registration page for a new user
   */
  describe('Registration page for a new user', () => {
    beforeEach(() => {
      regPage = new RegistrationPage();
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    it('should display all input fields', () => {
      regPage.navigateTo();
      expect(regPage.getFullNameInput()).toBeTruthy();
      expect(regPage.getUserNameInput()).toBeTruthy();
      expect(regPage.getEmailInput()).toBeTruthy();
      expect(regPage.getPasswordInput()).toBeTruthy();
    });

    it('should submit a valid form', () => {
      let fullname = regPage.getFullNameInput();
      fullname.sendKeys('Srishti Hunjan');

      let username = regPage.getUserNameInput();
      username_input = 'shunjantest10';
      username.sendKeys(username_input);

      let email = regPage.getEmailInput();
      email.sendKeys('shunjantest@gmail.com');

      let password = regPage.getPasswordInput();
      password.sendKeys('password');

      let regBtn = regPage.getRegisterButton();
      regBtn.click();
    });
  });

  /**
   * Describe for Login page for a existing user
   */
  describe('Login page for a existing user', () => {
    beforeEach(() => {
      loginPage = new LoginPage();
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it('should display all the input fields', () => {
      // loginPage.navigateTo();
      expect(loginPage.getUserNameInput()).toBeTruthy();
      expect(loginPage.getPasswordInput()).toBeTruthy();
    });

    it('grants access when valid credentials are entered', () => {
      let username = regPage.getUserNameInput();
      let password = regPage.getPasswordInput();

      username.sendKeys(username_input);
      password.sendKeys('password');

      loginPage.getLoginButton().click();
    });
  });

    /**
     * Describe for Home page for existing user
     */
    describe('Home page for existing user', () => {
      beforeEach(() => {
        homePage = new HomePage();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      });

      it('should display all input fields', () => {
        expect(homePage.getRestaurantNameInput()).toBeTruthy();
        expect(homePage.getLocationInput()).toBeTruthy();
      });

      it('should display all available restaurants for user-specified query', () => {
        const breakfastBtn = homePage.getBreakfastButton();
        breakfastBtn.click().then(function () {
          browser.sleep(2000);
        });
      });

      it('should navigate to the restaurant page that the user clicks on', () => {
        const resttPage = homePage.navigateToRestaurantPage();
        resttPage.click().then(function () {
          browser.sleep(2000);
        });
      });
    });

    /**
     * Describe for Restaurant page for existing user
     */
    describe('Restaurant page for existing user', () => {
      beforeEach(() => {
        restPage = new RestaurantPage();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      });

      it('should display all tabs', () => {
        expect(restPage.getMenuTab()).toBeTruthy();
        expect(restPage.getOverviewTab()).toBeTruthy();
        expect(restPage.getReviewTab()).toBeTruthy();
      });

      // it('should check-in to the restaurant', () => {
      //   restPage.getCheckinBtn().click();
      // });

      // it('should submit a review for the restaurant', () => {
      //   restPage.getwriteReviewBtn().click().then(function () {
      //     browser.sleep(2000);
      //     const rating = restPage.getRatingBox();
      //     rating.sendKeys('5');
      //     const review = restPage.getReviewBox();
      //     review.sendKeys('Best food ever!');
      //   });

      //   restPage.getSubmitReviewBtn().click();
      // });

      it('should display all menu images in Menu tab', () => {
        const menuTab = restPage.getMenuTab();
        // browser.sleep(2000);
        menuTab.click().then(function () {
          // browser.sleep(2000);
        });
      });

      it('should display all reviews in Reviews tab', () => {
        const reviewTab = restPage.getReviewTab();
        // browser.sleep(2000);
        reviewTab.click().then(function () {
          // browser.sleep(2000);
        });
      });
    });

    /**
     * Describe for Profile page for existing user
     */
    describe('Profile page for existing user', () => {
      beforeEach(() => {
        profilePage = new ProfilePage();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      });

      it('should display all tabs', () => {
        profilePage.navigateTo();
        expect(profilePage.getReviewTab()).toBeTruthy();
      });

      it('should display all checkins in Checkin tab', () => {
        const checkinTab = profilePage.getCheckinTab();
        // browser.sleep(2000);
        checkinTab.click().then(function () {
          // browser.sleep(2000);
        });
      });

      it('should display update user info tab', () => {
        const updateUserInfoTab = profilePage.getUpdateProfileTab();
        // browser.sleep(2000);
        updateUserInfoTab.click().then(function () {
          // browser.sleep(2000);
        });
      });

      it('should update user email', () => {
        const pwd = profilePage.getPassword();
        pwd.sendKeys('12345');
        browser.sleep(2000);
        const updateUserBtn = profilePage.getUpdateProfileButton();
        updateUserBtn.click().then(function () {
          // browser.sleep(2000);
        });
      });

    });

    /**
     * TODO - Implement Logout for logged in user
     */
  });
