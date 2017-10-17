import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { RouterTestingModule } from '@angular/router/testing';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpModule, 
        FormsModule,
        FlashMessagesModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [AuthService],
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
