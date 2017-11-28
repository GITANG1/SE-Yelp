/**
 * File name : login.po.ts
 * @author Srishti Hunjan
 */
import { browser, by, element, protractor } from 'protractor';

const origFn = browser.driver.controlFlow().execute;

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
export class ProfilePage {
    navigateTo() {
        return browser.get('/profile');
    }

    /**
     * Returns the reviewTab tab element
     */
    getReviewTab() {
        return element(by.id('reviewTab'));
    }

    /**
     * Returns the Checkin tab element
     */
    getCheckinTab() {
        return element(by.id('clickCheckinTab'));
    }

    /**
     * Returns the UpdateProfile tab element
     */
    getUpdateProfileTab() {
        return element(by.id('clickUpdateProfileTab'));
    }

    /**
     * Returns the update user info button element
     */
    getUpdateProfileButton() {
        return element(by.id('updateUserInfo'));
    }

    /**
     * Returns the user email input element
     */
    getPassword() {
        return element(by.name('userPassword'));
    }

    /**
     * Returns the browser's current URL
     */
    getCurrentUrl() {
        browser.getCurrentUrl();
    }
}
