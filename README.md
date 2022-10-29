# Resources in one Link

### The purpose of this application is to store all the resources that were used in the creation of your project
---
## Deployment
- ### [Live Page](https://resources-in-one-link.herokuapp.com/)
- ### [Github Repository](https://github.com/ttoomas/resources-in-one-link)
## What this app does?
    - Create new resources list
    - Login to created resources
    - Create, update and delete sources in resources list
    - Automatically generate short link that you can provide in your project
    - View resources list and view all source created in it
    - Custom page error page, that will be displayed, if you create resources list, but do not create any sources
    - Custom 404 error page
## Built with
    - Reactjs
    - Node js
    - Css
    - Editor - VS Code
## How to run
    .env
        LOGIN_JWT_KEY - Your random key for generate jwt token (for login)
        FRONTEND_URL - Url of your frontend - client folder
        DB_PASSWORD - Password for remote db
    
    - cd api && npm i && npm start
    - cd client && npm i && npm start