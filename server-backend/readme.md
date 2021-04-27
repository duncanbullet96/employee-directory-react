required packages for SQL side:
    express
    sequelize
    mysql2
    body-parser
    cors
        (command to install all of them: npm install express sequelize mysql2 body-parser cors --save)

look in the template folder for a template on how to handle each section of creating a new backend api

the order goes as follows:
step 1: create new database model
step 1.5: define the model in the models/index.js file so it can be attached and used later. 
step 2: create a contoller for the sql database (what commands from the api require which information and what they will do, you'll understand better when you look at it)
step 3: create api urls for each of those controller commands and assign a REST API command for that url 
step 4: tie in the new controller in the server.js file
