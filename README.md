# <p align=center>TODO APP</p>

<p align=center><img src="https://forthebadge.com/images/badges/winter-is-coming.svg">      <img src="https://forthebadge.com/images/badges/made-with-vue.svg"></p>



This is a show case Todo application using express js on the backend and vue JS on the frontend.

<h4 align=center>How to Use</h4>

- After full setup, you must register. You cannot have a duplicate Username or email in the address. You must verify your password and your email must be a valid email string.
Upon registeration, you will be redirected to the login page and from there you can sign in with the credentials that you set

- On login you will be redirected to the todos page where you will be able to add your todo, mark your todos as complete and delete your todos. The button Add new todo show a modal where you will fill in all your desired details. On saving it will immediately add your new Todo to the list.

- To mark as complete, double-click on the Todo and to delete, just click on the trash can. (*I assume double-tap works on phone as well*)


## How To Deploy

### 1. Development Server
To deploy this on your development server after cloning it onto your system, set up the environment configuration by copying the provided *.env.example* file.run the following command:

```py

$ cp .env.example .env

```

after that the variables include:
- NODE_ENV - *value should be a string of value 'development'*
- PORT - *value should be an integer*
- DB_CONNECTION - *value should be a string of the database connection URL*
- APP_SECRET - *value should be a string of any value of your choosing*

```py
# Example for .env file

NODE_ENV=development
DB_CONNECTION=mysql://root@localhost:3306/todoapp
PORT=5000
APP_SECRET=Justasecret

```

after this setup you may run:

```py

$ npm install 

```
 
this command will install all the dependancies found in the *package.json* file.

to start the server and compile the frontend files, run in two terminals:

```py
# start the server

$ npm start

```

    AND

```py
# compile frontend

$ npm run dev

```

You will see the link to start running the Application in your server terminal where you ran *npm start*


### 2. Production Server (e.g Heroku)

The only differences with setting it up for development and production are that on heroku, the applications configuration variables will be set on heroku and not on the root of the application other than that the variables will be the same. It is recommended that the *NODE_ENV* variable should be set to production.

to compile and minify the frontend files run:
```py

$ npm run prod

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
- Bootstrap 4
- Fontawesome 5
- Sweetalert

## DATABASE
- MySQL *through XAMPP*

