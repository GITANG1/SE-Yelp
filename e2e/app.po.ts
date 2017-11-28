/**
 * File name : app.po.ts
 * @author Srishti Hunjan
 */
import { browser, by, element } from 'protractor';

/**
 * Exports the main app page for e2e testing
 */
export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
