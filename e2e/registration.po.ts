import { browser, by, element, protractor } from 'protractor';

let origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
    let args = arguments;

    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(10);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

export class RegistrationPage {
    navigateTo() {
        return browser.get('/register');
    }

    getCurrentUrl() {
        browser.getCurrentUrl();
    }

    getFullNameInput() {
        return element(by.name('name'));
    }

    getUserNameInput() {
        return element(by.name('username'));
    }

    getEmailInput() {
        return element(by.name('email'));
    }

    getPasswordInput() {
        return element(by.name('password'));
    }

    getRegisterButton() {
        return element(by.id('regBtn'));
    }

    getFlashMessageError() {
        return element(by.id('flashMessages'));
    }

    getRandomNumber(max, min) {
        return Math.floor(Math.random() * (- min + 1)) + min;
    }
}
