# Restaurant-Assignment

An test assignment for RestApi of Restaurants and their products.

- CURD Opertation for Restaurants.
- CURD Opertation for Restaurant's products.

Clone down this repository. You will need `node` latest stable version installed on your machine.  

You have to install `nodemon` as global dependency by `npm install -g nodemon`

### Technologies Used
- NodeJs
- TypeScript
- ExpressJs
- Mongodb

### Directories
 - src:
    - controllers (controllers and logical part of the application)
    - interfaces (Interfaces used for typescript)
    - middlewares (application's middlewares)
    - models (mongo database's models)
    - routes (api routes)
    - seeders (Custom seeders for creating productcategories)
    - services (database quering for application)
    - types (types used for typescript)
    - utils (utilities functions used in aplication)

### challenges/problems Encounters
- For creating custom seeder for productcategory collection.
### Installation and Setup Instructions

Installation of dependencies (project's root directory):

`npm install` or `npm i`

To create Seeder (for creating productcategories collection with data)

`npm run seeder`
  
To Start Server (as Development):

`npm run start-dev`

To Start Server (as Production):

`npm run start-production`

To Access API on:

`http://localhost:3001`
