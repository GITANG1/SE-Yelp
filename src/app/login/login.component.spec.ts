import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AuthService} from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { LoginComponent } from './login.component';
import {  MatButtonModule, } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        FlexLayoutModule,
        HttpModule,
        FormsModule,
        FlashMessagesModule,
        RouterTestingModule.withRoutes([{ path: 'home', component: LoginComponent }])
      ],
      declarations: [ LoginComponent ],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
