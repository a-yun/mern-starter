# Smart Offer

Smart Offer is a web application that helps you decipher the terms of all your various job offers. It provides you with a comparison of your offers by standardizing them based on cost of living and other regional expenses. 

## Quickstart

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/). Also `npm3` is required to install dependencies properly.

If this doesn't work on Windows Subsystem for Linux, try installing an older version of MongoDB using `sudo apt-get install mongodb`. Then, run it in a separate bash window using `sudo mongod`. You may have to create an additional directory by running `sudo mkdir /data/db`. 

```
  npm install
  npm start
```
You can access the app at `http://localhost:8000`.


## Available Commands (from original project)

1. `npm run start` - starts the development server with hot reloading enabled

2. `npm run bs` - bundles the code and starts the production server

3. `npm run test` - start the test runner

4. `npm run watch:test` - start the test runner with watch mode

5. `npm run cover` - generates test coverage report

6. `npm run lint` - runs linter to check for lint errors
