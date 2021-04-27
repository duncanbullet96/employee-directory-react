//this is the database schema - because sequalize builds tables for you, we need to define how we want our table to work.


const { sequelize, Sequelize } = require("sequelize");// this is required, this imports the sequelize package

//module exports just means whatever we put under here, we can call later when the title we give it at the const level and the return statement the bottom.
// for instance if we give use: 'return my_table' we can later use my_table.exports to access this information. 


module.exports = (sequelize, Sequelize) => {

    const my_table = sequelize.define("my_table", {     //name the table your setting up here, use the same name in thie define statment.
        // each child object here can be thought of as a header, while the items within that object are the paramters of the header. (type of data, default value, etc)
        column1: {
            type: Sequelize.STRING
        },
        column2: {
            type: Sequelize.INT
        },
        column3: {
            type: Sequelize.STRING
        }
    });

return my_table; // finally we return this const into the module.exports as the name. 

};