import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { AuthService } from '../services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { HttpModule } from '@angular/http';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        MatToolbarModule,
        MatButtonModule,
        FlashMessagesModule,
        RouterTestingModule.withRoutes([{ path: 'home', component: SignupComponent }])
      ],
      providers: [AuthService],
      declarations: [SignupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
