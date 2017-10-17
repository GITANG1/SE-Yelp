 # GULP
 
 ## Description: 
 The project aims to emulate Yelp and improve the search speed and quality by implementing ElasticSearch and Recommendation engine capabilities. This is being developed for the Software Engineering course (CEN5035) at the University of Florida, Fall 2017.
 
 ## Technology Involved:
  - Angular 4
  - Material Design
  - TypeScript
  - NodeJs
  - Selenium
  - Mocha
 
 ## How To Run
 1. `npm install` - To install all required node modules
 2. `ng build` - To build the angular app
 3. `node app.js` - To be run in a separate terminal to start the node server
 4. `mongod --dbpath data` - To start the mongo server
 4. In a browser, go to "localhost:4200" to access the website

 ## Backend API

 ### Restaurant API
1. Restaurants Listing API
  List of all restaurants for predictions before searching.
  * URL:
    restaurants/List
  * Method: 
    GET
  * URL Params:
    None
  * Data Params:
    None

2. Restaurant Searching API
  Query for restaurants
  * URL:
    restaurants/Search/
  * Method:
    POST
  * URL Params:
    None
  * Data Params:
    {
      Search: ’Search keyword’ 
    }

3. Restaurant Details API
  Data for restaurant with particular restaurantID
  * URL:
    restaurants/restID/:restID
  * Method: 
    GET
  * URL Params: 
    restID
  * Data Params:
    None

### User API
1. User Register API
  Used to register new user
  * URL:
    User/register
  * Method: 
    POST
  * URL Params:
    None
  * Data Params:
    {
      Name: ‘User name’
      Email: ‘User email’
      Username: ‘username to be used to login’
      Password: ‘password to authenticate user’
    }
  
2. User Authenticate API
  Used to authenticate user
  * URL:
    User/authenticate
  * Method: 
    POST
  * URL Params:
    None
  * Data Params:
    {
      Username: ‘Username corresponding to user’
      Password: ‘Password to authenticate the user’
    }

 
 ## Team Members:
  - Adhiraj Nakhe (nakhe93@ufl.edu)
  - Gagandeep Singh Chadha (gdeepchadha@ufl.edu)
  - Gitang Karnam (gkarnam@ufl.edu)
  - Srishti Hunjan (shunjan@ufl.edu)
