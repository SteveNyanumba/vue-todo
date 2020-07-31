# <p align=center>TODO APP</p>

<div align=center> [![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/winter-is-coming.svg)](https://forthebadge.com) </div>


This is a show case application using express js on the backend and vue JS on the frontend.

## How To Deploy

### 1. Development Server
To deploy this on your development server after cloning it onto your system, set up the environment configuration by copying the provided *.env.example* file.run the following command:

```git

cp .env.example .env

```

after that the variables include:
- NODE_ENV - *value should be a string of value 'development'*
- PORT - *value should be an integer*
- DB_CONNECTION - *value should be a string of the database connection URL*
- APP_SECRET - *value should be a string of any value of your choosing*

after this setup you may run either
```git

npm install 

```
    ALTERNATIVELY...

```git

npm i

```
either of the two commands will install the dependancies as per found in the *package.json*

to start the server and compile the frontend files, run in two terminals:

```git

npm start

```

    AND

```git

npm run dev

```

You will see the link to start running the Application in your server terminal where you ran *npm start*


### 2. Production Server (e.g Heroku)

The only differences with setting it up for development and production are that on heroku, the applications configuration variables will be set on heroku and not on the root of the application other than that the variables will be the same. It is recommended that the *NODE_ENV* variable should be set to production.

to compile and minify the frontend files run:
```git

npm run prod

```

this will instruct Webpack to minify the stylesheets and scripts used for the frontend part of the application.



## Tools Used

### BACKEND

- Express JS
- JSONwebtoken
- Sequelize

### FRONTEND

- Vue *with Vuex*
- Laravel MIX webpack wrapper
- Bootstrap 4.5
- Fontawesome 5
- SASS
- Sweetalert

