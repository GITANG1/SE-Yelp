/**
 * File name : login.po.ts
 * @author Srishti Hunjan
 */
import { browser, by, element, protractor } from 'protractor';

const origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
    const args = arguments;
    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(10);
    });
    return origFn.apply(browser.driver.controlFlow(), args);
};

/**
 * Exports the restaurant page for e2e testing
 */
export class RestaurantPage {
    navigateTo() {
        return browser.get('/restaurant/2');
    }

    /**
     * Returns the clickOverviewTab tab element
     */
    getOverviewTab() {
        return element(by.id('clickOverviewTab'));
    }

    /**
     * Returns the Meu tab element
     */
    getMenuTab() {
        return element(by.id('clickMenuTab'));
    }

    /**
     * Returns the Review tab element
     */
    getReviewTab() {
        return element(by.id('clickReviewTab'));
    }

    /**
     * Returns the Check-in button
     */
    getCheckinBtn() {
        return element(by.name('checkinBtn'));
    }

    /**
    * Returns the write a Review button
    */
    getwriteReviewBtn() {
        return element(by.name('writeReviewBtn'));
    }

    /**
     * Returns the Submit Review button
     */
    getSubmitReviewBtn() {
        return element(by.name('submitReviewBtn'));
    }

    /**
     * Returns the ratingbox element
     */
    getRatingBox() {
        return element(by.id('ratingbox'));
    }

    /**
     * Returns the reviewbox element
     */
    getReviewBox() {
        return element(by.id('reviewbox'));
    }

}
