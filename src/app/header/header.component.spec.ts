import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from '../signup/signup.component';
import { HeaderComponent } from './header.component';
import { MatToolbarModule, MatButtonModule, } from '@angular/material';
import { HttpModule } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, SignupComponent],
      imports: [
        MatToolbarModule,
        MatButtonModule,
        FlexLayoutModule,
        HttpModule,
        FlashMessagesModule,
        RouterTestingModule.withRoutes([{ path: 'home', component: HeaderComponent }])
      ],
      providers: [AuthService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
