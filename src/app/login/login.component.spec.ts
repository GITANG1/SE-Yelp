import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  MatButtonModule, } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import {AuthService} from '../services/auth.service';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { RouterTestingModule } from '@angular/router/testing';



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
