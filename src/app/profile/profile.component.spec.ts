import {
  async,
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http, Response, Headers, HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { ReactiveFormsModule } from '@angular/forms';


import {
  MatAutocompleteModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatTabsModule,
  } from '@angular/material';

 
describe('ProfileComponent', () => {
  let fixture:          ComponentFixture<ProfileComponent>;
  let comp:             ProfileComponent;
  let Updatebtn:       HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        BrowserAnimationsModule,
        HttpModule, 
        MatAutocompleteModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        FlashMessagesModule,
        RouterTestingModule
      ],
      providers: [
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() =>{
    fixture=TestBed.createComponent(ProfileComponent);
    comp = fixture.componentInstance;   
   // fixture.detectChanges();
 
 });


  it('should create ProfileComponent ', () => {
  
    expect(ProfileComponent).toBeTruthy();
  });

  // it('checks  Update button', async(() => {
  //   jasmine.createSpy('updateUserInfo').and.callThrough();
  //   comp.selectedIndex=2;
  //   Updatebtn = fixture.debugElement.nativeElement.querySelector('button');
  //   Updatebtn.click();
  //   fixture.whenStable().then(()=>{
  //    expect(comp.updateUserInfo).toHaveBeenCalled() 
  //   });      
  //   }));

});
