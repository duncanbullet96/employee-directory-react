// ill take "things you should have called database schema for 200 Alex"
// really though this just takes our schema and exports it. 
const { sequelize, Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const wp_participants_database = sequelize.define("wp_participants_database", {
        private_id: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        alt_phone:{
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        department_id: {
            type: Sequelize.STRING
        },
        location_id: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        }
    });

return wp_participants_database;

};