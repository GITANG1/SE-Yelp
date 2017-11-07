import { async,
  ComponentFixture,
  TestBed,
  ComponentFixtureAutoDetect, tick } from '@angular/core/testing';
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
import {MockBackend} from "@angular/http/testing";
import { 
FormsModule, 
ReactiveFormsModule 
} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { Http,
Response,
Headers,
BaseRequestOptions,
ResponseOptions,
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
let breakfast_html:   HTMLElement;
let lunch_html:       HTMLElement;
let dinner_html:      HTMLElement;
let delivery_html:    HTMLElement;
let backend: MockBackend;


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
 providers:[  MockBackend,
   BaseRequestOptions,{
   provide: ComponentFixtureAutoDetect, useValue:true
 },
 {
   provide: Http,
   useFactory: (backend, options) => new Http(backend, options),
   deps: [MockBackend, BaseRequestOptions]
 }

 ]
})
.compileComponents();// declare the test component
}));

beforeEach(() =>{
   fixture=TestBed.createComponent(HomeComponent);
   comp = fixture.componentInstance;   
   fixture.detectChanges();
   backend = TestBed.get(MockBackend);
   const input = fixture.debugElement.queryAll(By.css('input'));
   const  btns = fixture.debugElement.queryAll(By.css('button'));
   search_html= btns[0].nativeElement;
   breakfast_html = btns[1].nativeElement;
   lunch_html = btns[2].nativeElement;  
   restaurant_html = input[0].nativeElement;
   area_htlml = input[1].nativeElement;
});



it('checks home input box for restaurant name ', () => {
expect(restaurant_html.textContent).toEqual('');

});

it('checks home input box for location ', () => {
expect(area_htlml.textContent).toEqual('');      
});

it('cheks  search button', async(() => {
searchspy = spyOn(comp, 'SearchRestaurants').and.callThrough();
const searchBtn = fixture.debugElement.nativeElement.querySelector('button');
searchBtn.click();
fixture.whenStable().then(()=>{
 expect(comp.SearchRestaurants).toHaveBeenCalled() 
});      
}));

it('cheks breakfast button', async(() => {
searchspy = spyOn(comp, 'SearchByTags').and.callThrough();
const  btns = fixture.debugElement.queryAll(By.css('button'));
breakfast_html = btns[1].nativeElement;

breakfast_html.click();
 fixture.whenStable().then(()=>{
  expect(comp.SearchByTags).toHaveBeenCalled(); 
});      
}));


it('cheks lunch button', async(() => {
searchspy = spyOn(comp, 'SearchByTags').and.callThrough();
const  btns = fixture.debugElement.queryAll(By.css('button'));
lunch_html = btns[2].nativeElement;
lunch_html.click();
fixture.whenStable().then(()=>{
expect(comp.SearchByTags).toHaveBeenCalled() 
});      
}));

 // it('search should return SearchItems', async(() => {
 //   let response = { 
 //     "resultCount": 1,
 //     "results": [
 //       {
 //         "artistId": 78500,
 //         "artistName": "U2",
 //         "trackName": "Beautiful Day",
 //         "artworkUrl60": "image.jpg",
 //       }]
 //   };
 
 //   backend.connections.subscribe(connection => { 
 //     connection.mockRespond(new Response(<ResponseOptions>{ 
 //       body: JSON.stringify(response)
 //     }));
 //   });
 //   comp.SearchRestaurants('hello','world');
 //   expect(comp.results.length).toBe(1);  
 // }));


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