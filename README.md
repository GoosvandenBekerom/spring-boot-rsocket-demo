# spring-boot-rsocket-demo

This repository contains a example of Spring RSocket messaging between spring boot and a simple js application.


## How to run

run `$ npm install` from the `src/main/resources/public` folder

start the spring boot application by running `$ ./gradlew bootRun` from the root directory of this repository

## Changing the javascript

If you make changes in the `index.js` file, run `$ browserify index.js > app.js` to see the changes in the browser. 
