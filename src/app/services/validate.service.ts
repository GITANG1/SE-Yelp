/**
 * File name : validate.service.ts
 * @author Srishti Hunjan
 */
import { Injectable } from '@angular/core';

/**
 * This service validates the data entered by a user during registration to ensure clean data
 */
@Injectable()
export class ValidateService {

  /**
   * @constructor
   */
  constructor() { }

  /**
   * Checks if the data entered by the user is valid
   * @param {JSON} user
   */
  validateRegister(user) {
    if (user.name === undefined || user.email === undefined || user.username === undefined || user.password === undefined
      || user.name === '' || user.email === '' || user.username === '' || user.password === '') {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Checks if the email entered by the user is valid
   * @param {String} email
   */
  validateEmail(email) {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEXP.test(email);
  }
}
