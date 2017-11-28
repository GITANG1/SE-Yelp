import { TestBed, async, fakeAsync, ComponentFixture,ComponentFixtureAutoDetect,tick,inject } from '@angular/core/testing';
import { RestaurantComponent } from './restaurant.component';
import { By }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReflectiveInjector, Injectable} from "@angular/core";
import {ConnectionBackend, RequestOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatTabsModule
} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
  Http,
  Response,
  Headers,
  BaseRequestOptions,
  ResponseOptions,
  HttpModule
} from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';





describe('RestaurantComponent', () => {

  var location: Location;

  let fixture:          ComponentFixture<RestaurantComponent>;
  let comp:             RestaurantComponent;
  let reviewbtn:       HTMLElement;
  let checkin:      HTMLElement;
  let res: Response;



  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
     
    ]);
  
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);


  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        HttpClientTestingModule,
        HttpClientModule, 
        MatButtonModule,
        MatInputModule,
        MatTabsModule,
        BrowserAnimationsModule,
        FlashMessagesModule
      ],
      providers: [ValidateService, AuthService ,{provide: ActivatedRoute,useValue: {
        params: Observable.of({id: 3})
      }
    }]
    });
    // router.initialNavigation();
  }));

  beforeEach(() =>{
    
    fixture=TestBed.createComponent(RestaurantComponent);
    comp = fixture.componentInstance;   
    fixture.detectChanges();
 });


  // it('should create the restaurantcomponent', () => {
 
  //   expect(RestaurantComponent).toBeTruthy();
  // });


  it('checks  writeaReview button', async(() => {
    jasmine.createSpy('Writeareview').and.callThrough();
    const checkinBtn = fixture.debugElement.queryAll(By.css('button'));
    reviewbtn = checkinBtn[0].nativeElement;
    reviewbtn.click();
    fixture.whenStable().then(()=>{
     expect(comp.Writeareview).toHaveBeenCalled() 
    });      
    }));

    

    it('checks  showreview value', async(() => {
      
      comp.showreview=true;
       expect(comp.showreview).toBeTruthy();
      }));

      it('checks  submit function value', async(() => {
        
          expect(comp.showreview).toBeFalsy();
      }));

      it('checks  menuUrl value', async(() => {
        
        //comp.menuurl = "xyz";
              expect(comp.menuurl).toBeFalsy();
      }));

      it('checks  Restaurant Name', async(() => {

       // comp.restaurantname="this is a address";
              expect(comp.restaurantname).toBeFalsy();
      }));

      it('checks  RestaurantDetails', async(() => {
        
              expect(comp.RestaurantDetails).toBeFalsy();
      }));

      it('checks  logourl', async(() => {
        
              expect(comp.logoUrl).toBeFalsy();
      }));

      var restaurantname = 'Hello';
    
});
