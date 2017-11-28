/**
 * File name : home.po.ts
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
 * Exports the home page for e2e testing
 */
export class HomePage {
    navigateTo() {
        return browser.get('/home');
    }

    /**
     * Returns the restaurant name
     */
    getRestaurantNameInput() {
        return element(by.name('rest'));
    }

    /**
     * Returns the restaurant city
     */
    getLocationInput() {
        return element(by.name('area'));
    }

    /**
     * Returns the search button on the home page
     */
    getSearchButton() {
        return element(by.id('searchBtn'));
    }

    /**
     * Returns the current browser URL
     */
    getCurrentUrl() {
        browser.getCurrentUrl();
    }

    /**
     * Returns the Breakfast tag element
     */
    getBreakfastButton() {
        return element(by.name('breakfast'));
    }

    /**
     * Returns the restaurant button element
     */
    navigateToRestaurantPage() {
        return element(by.name('restaurantBtn'));
    }
}
