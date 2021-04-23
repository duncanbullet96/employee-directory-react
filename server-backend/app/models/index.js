const dbConfig = require("../config/db.config.js"); // pulls in the configuration data and stores in to a variable called dbConfig

const Sequelize = require("sequelize"); //stores the sequelize modules as the variable Sequelize with a CAPITAL S DAMNIT
const sequelize = new Sequelize(                    //initialize a new Sequelize connection with the following parameters and store it as the variable sequelzie (lower case shhhh)
    dbConfig.DB,                                    // db name
    dbConfig.USER,                                  // db username
    dbConfig.PASSWORD,                              // db password
    
    // this part hurts
    {
        host: dbConfig.HOST, 
        dialect: dbConfig.dialect, 
        operatorsAliases: 0, 
        //still hurts
        pool: {
            max: dbConfig.pool.max, 
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });


// create the variable db and store nothing in it. 
const db = {};

db.Sequelize = Sequelize; //db.Sequelize is equal to the CAPITAL S Sequelize
db.sequelize = sequelize;   // inverse 

db.admin_table = require("./admin-table.model.js")(sequelize, Sequelize);
db.user_table = require("./userTable.model.js")(sequelize, Sequelize);
db.wp_participants_database = require("./model.js")(sequelize, Sequelize); //our db.wp_participants_database is equal to the model information from model.js 
                                                                            // aka this our scheme pull 

module.exports = db;
