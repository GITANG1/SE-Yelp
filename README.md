 # GULP
 
 ## Description
 The project aims to emulate Yelp and improve the search speed and quality by using ElasticSearch. This is being developed for the Software Engineering course (CEN5035) at the University of Florida, Fall 2017.
 
 ## Technology Involved
  - Angular 4
  - Material Design
  - TypeScript
  - NodeJs
  - ElasticSearch
  - Protractor
 
## Installation
  ### Node v4.2.0
  Install node v4.2.0 from https://nodejs.org/en/download/

  ### Elasticsearch v5.3.6
  - Install Elasticsearch v5.3.6 from http://www.elastic.co/downloads/past-releases/elasticsearch-5-6-3
  - Unzip the downloaded zip file into desired location
  - Add the bin floder to the path environment variable

  ### Install Dependencies
  - `npm install` - To install all required node modules
  - `npm install mocha -g` - To install mocha globally


 ## How To Run
 1. `npm install` - To install all required node modules
 2. `elasticsearch` - To be run in a separate terminal to start the elasticsearch server
 3. `node www` - To be run in a separate terminal to start the node server 
 4. `ng build` - To be run in a separate terminal to build the angular app
 5. In a browser, go to "localhost:4200" to access the website
 
## Running Front-End Tests
  ### Running unit tests
  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

  ## Running end-to-end tests
  Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
  Before running the tests make sure you are serving the app via `ng serve`.

## Running Back-End Tests
  - Make sure you have installed mocha globally using command `npm install mocha -g`
  - Go into backend test floder and open the command prompt
  - Run backend tests using command `mocha "test*.js"`

## Documentation

  ### Back-End Documentation
  - Backend API Documentation https://github.com/GITANG1/SE-Yelp/wiki/Documentation:-Backend-API
  - Backend Auto-Generated Documentation https://github.com/GITANG1/SE-Yelp/tree/master/docsusers

  ## Front-End Docmentation
  - Frontend Documentation wiki https://github.com/GITANG1/SE-Yelp/wiki/Documentation:-Frontend
  - Frontend Auto-Generated Documentation
 ## Team Members
  - Adhiraj Nakhe (nakhe93@ufl.edu)
  - Gagandeep Singh Chadha (gdeepchadha@UFL.EDU)
  - Gitang Karnam (gkarnam@ufl.edu)
  - Srishti Hunjan (shunjan@ufl.edu)
