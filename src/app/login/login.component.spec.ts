import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('LoginComponent', () => {

  let loginspy: jasmine.Spy;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let username_debug: DebugElement;
  let username_html: HTMLInputElement;
  let password_debug: DebugElement;
  let password_html: HTMLInputElement;
  let login_debug: DebugElement;
  let login_html: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        FlashMessagesModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [AuthService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const input = fixture.debugElement.queryAll(By.css('input'));

    username_html = input[0].nativeElement;
    password_html = input[1].nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should check username input textbox', () => {
    expect(username_html.textContent).toEqual('');

  });

  it('should check password input textbox', () => {
    expect(password_html.textContent).toEqual('');

  });

  describe('when the user submits the login form', () => {

    beforeEach(() => {
      loginspy = spyOn(component, 'onLoginSubmit');
      const reg_button = fixture.debugElement.nativeElement.querySelector('button');
      reg_button.click();
    });

    it('should invoke the onLoginSubmit function', async(() => {
      fixture.whenStable().then(() => {
        expect(component.onLoginSubmit).toHaveBeenCalled();
      });
    }));
  });
});
