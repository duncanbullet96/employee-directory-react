// configuration file for the sequalize mysql connection

module.exports = {
    HOST: "intranet-hci",
    USER: "node_service",
    PASSWORD: "null",
    DB:"opcon", 
    dialect: "mysql",
    pool: { //sql paramters for the connection
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }


};