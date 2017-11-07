import { browser, by, element, protractor } from 'protractor';

let origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
    let args = arguments;

    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(10);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

export class LoginPage {
    navigateTo() {
        return browser.get('/login');
    }

    getUserNameInput() {
        return element(by.name('username'));
    }

    getPasswordInput() {
        return element(by.name('password'));
    }

    getLoginButton() {
        return element(by.id('loginBtn'));
    }

    getCurrentUrl() {
        browser.getCurrentUrl();
    }
}
