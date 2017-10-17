import { async,
         ComponentFixture,
         TestBed,
         ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule
} from '@angular/material';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { Http,
    Response,
    Headers,
    HttpModule 
  } from '@angular/http';

describe('HomeComponent', () => {
    
    let searchspy :       jasmine.Spy;
    let comp:             HomeComponent;
    let fixture:          ComponentFixture<HomeComponent>;    
    let title_debug:      DebugElement;
    let title_html:       HTMLElement;
    let restaurant_debug: DebugElement;
    let restaurant_html:  HTMLInputElement;
    let area_debug:       DebugElement;
    let area_htlml:       HTMLInputElement;
    let search_debug:     DebugElement;
    let search_html:      HTMLElement;

    beforeEach(async(() => {
      
      TestBed.configureTestingModule({
        declarations: [ HomeComponent ],
        imports: [
          HttpModule, 
          FormsModule,
          MatAutocompleteModule,
          MatToolbarModule,
          MatFormFieldModule,
          MatCardModule,
          MatButtonModule,
          MatSelectModule,
          ReactiveFormsModule
        ],
        providers:[{
          provide: ComponentFixtureAutoDetect, useValue:true
        }

        ]
      })
      .compileComponents();// declare the test component
      }));
  
      beforeEach(() =>{
          fixture=TestBed.createComponent(HomeComponent);
          comp = fixture.componentInstance;   
          fixture.detectChanges();
         
          const input = fixture.debugElement.queryAll(By.css('input'));
          search_debug = fixture.debugElement.query(By.css('button'));
          search_html= search_debug.nativeElement;
         
          restaurant_html = input[0].nativeElement;
          area_htlml = input[1].nativeElement;
    });



    it('checks home input ', () => {
      expect(restaurant_html.textContent).toEqual('');
      
    });

   it('cheks button', async(() => {
     searchspy = spyOn(comp, 'SearchRestaurants').and.callThrough();
     const searchBtn = fixture.debugElement.nativeElement.querySelector('button');
       searchBtn.click();
       fixture.whenStable().then(()=>{
        expect(comp.SearchRestaurants).toHaveBeenCalled() 
      });      
     }));
  
  //  it('cheks button with values', async(() => {
  //   searchspy = spyOn(comp, 'SearchRestaurants');
  //   const searchBtn = fixture.debugElement.nativeElement.querySelector('button');
 
  //   searchBtn.click();
    
  //   fixture.detectChanges();
  //   // expect($('#sandbox')).toHaveValue(value);
  //   restaurant_html.defaultValue = 'burger';
  //   restaurant_html.dispatchEvent(new Event('input'));
  //   expect(restaurant_html.defaultValue).toEqual("burger"); 
  //   expect(comp.SearchRestaurants).toHaveBeenCalledWith('burger','london'); 
  //   fixture.whenStable().then(()=>{
  //   expect(comp.SearchRestaurants).toHaveBeenCalledWith(restaurant_html.textContent,area_htlml.textContent); 
  //    });      
  //   }));


    

  });