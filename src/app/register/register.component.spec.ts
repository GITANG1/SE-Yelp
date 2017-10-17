import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { Http, Response, Headers, HttpModule } from '@angular/http';

describe('RegisterComponent', () => {
  let regSpy: jasmine.Spy;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let reg_button_de: DebugElement;
  let name_input: DebugElement;
  let username_input: DebugElement;
  let email_input: DebugElement;
  let password_input: DebugElement;
  let name_HtmlElement: HTMLElement;
  let username_HtmlElement: HTMLElement;
  let email_HtmlElement: HTMLElement;
  let password_HtmlElement: HTMLElement;
  let reg_button_he: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        BrowserAnimationsModule,
        HttpModule,
        FlashMessagesModule,
        FormsModule,
        HttpModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        ValidateService, AuthService
      ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const input = fixture.debugElement.queryAll(By.css('input'));
    name_input = input[0];
    username_input = input[1];
    email_input = input[2];
    password_input = input[3];
    name_HtmlElement = name_input.nativeElement;
    username_HtmlElement = username_input.nativeElement;
    email_HtmlElement = email_input.nativeElement;
    password_HtmlElement = password_input.nativeElement;

    reg_button_de = fixture.debugElement.query(By.css('button'));
    reg_button_he = reg_button_de.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('On page load', () => {

    it('should display a blank name input field' , () => {
      expect(name_HtmlElement.textContent).toEqual('');
    });

    it('should display a blank username input field' , () => {
      expect(username_HtmlElement.textContent).toEqual('');
    });

    it('should display a blank email input field' , () => {
      expect(email_HtmlElement.textContent).toEqual('');
    });

    it('should display a blank password input field' , () => {
      expect(password_HtmlElement.textContent).toEqual('');
    });
  });

  describe('when the user submits the registration form', () => {

    beforeEach(() => {
      regSpy  = spyOn(component, 'onRegisterSubmit');
      const reg_button = fixture.debugElement.nativeElement.querySelector('button');
      reg_button.click();
    });

    it('should invoke the onRegisterSubmit function', async(() => {
      fixture.whenStable().then(() => {
        expect(component.onRegisterSubmit).toHaveBeenCalled();
      });
    }));
  });
});
