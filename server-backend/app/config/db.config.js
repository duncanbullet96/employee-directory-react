// configuration file for the sequalize mysql connection
require
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB:"opcon", 
    dialect: "mysql",
    pool: { //sql paramters for the connection
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }


};