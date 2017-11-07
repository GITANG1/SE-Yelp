import { browser, by, element, protractor } from 'protractor';

let origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
    let args = arguments;

    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(10);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

export class HomePage {
    navigateTo() {
        return browser.get('/home');
    }

    getRestaurantNameInput() {
        return element(by.name('rest'));
    }

    getLocationInput() {
        return element(by.name('area'));
    }

    getSearchButton() {
        return element(by.id('searchBtn'));
    }

    getCurrentUrl() {
        browser.getCurrentUrl();
    }

    getBreakfastButton() {
        return element(by.name('breakfast'));
    }
}
