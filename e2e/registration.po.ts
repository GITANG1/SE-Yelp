/**
 * File name : registration.po.ts
 * @author Srishti Hunjan
 */
import { browser, by, element, protractor } from 'protractor';

let origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  let args = arguments;

  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(10);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

/**
 * Exports the registration page for e2e testing
 */
export class RegistrationPage {
    navigateTo() {
        return browser.get('/register');
    }

    /**
     * Returns the current URL
     */
    getCurrentUrl() {
        browser.getCurrentUrl();
    }

    /**
     * Returns the user's name
     */
    getFullNameInput() {
        return element(by.name('name'));
    }

    /**
     * Returns the user's username
     */
    getUserNameInput() {
        return element(by.name('username'));
    }

    /**
     * Returns the user's email
     */
    getEmailInput() {
        return element(by.name('email'));
    }

    /**
     * Returns the user's password
     */
    getPasswordInput() {
        return element(by.name('password'));
    }

    /**
     * Returns the registration button element
     */
    getRegisterButton() {
        return element(by.id('regBtn'));
    }

    /**
     * Returns the flash message error
     */
    getFlashMessageError() {
        return element(by.id('flashMessages'));
    }

    /**
     * Returns a random number used to append to the username
     */
    getRandomNumber(max, min) {
        return Math.floor(Math.random() * ( - min + 1)) + min;
    }
}
