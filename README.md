# Pizza Ordering

## Intro:

I did not really have much time that I wanted to so I could only implement the core logic on the server side using Node.JS (JS instead of TypeScript as I'm not quite familiar with TypeScript, though I did have less than a year of experience with TypeScript)

This project is based on ExpressJS version 4.17 and MongoDB Version 5

### Pre-Requisites

- MongoDB Version 5
- Node.js Version 14


### How to run

Please make sure if you have mongoDB installed locally (without any credentials)

Please run the following commands

`$ cd server && npm install`

`$ npm run start`

To run the Unit Test Cases please run the following command:

`$ npm run test`


After you start the project, please initialize the Pizza Data via Following `curl` commands or import to Postman

```
curl --location --request POST 'http://localhost:4000/product' \
--form 'name="Small Pizza"' \
--form 'price="11.99"' \

curl --location --request POST 'http://localhost:4000/product' \
--form 'name="Medium Pizza"' \
--form 'price="15.99"' \

curl --location --request POST 'http://localhost:4000/product' \
--form 'name="Large Pizza"' \
--form 'price="21.99"' \
```



