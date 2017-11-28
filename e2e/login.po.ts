/**
 * File name : login.po.ts
 * @author Srishti Hunjan
 */
import { browser, by, element, protractor } from 'protractor';

let origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
    let args = arguments;

    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(10);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

/**
 * Exports the login page for e2e testing
 */
export class LoginPage {
    navigateTo() {
        return browser.get('/login');
    }

    /**
     * Returns the user's username
     */
    getUserNameInput() {
        return element(by.name('username'));
    }

    /**
     * Returns the user's password
     */
    getPasswordInput() {
        return element(by.name('password'));
    }

    /**
     * Returns the login button element
     */
    getLoginButton() {
        return element(by.id('loginBtn'));
    }

    /**
     * Returns the browser's current URL
     */
    getCurrentUrl() {
        browser.getCurrentUrl();
    }
}
