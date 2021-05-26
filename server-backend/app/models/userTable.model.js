// ill take "things you should have called database schema for 200 Alex"
// really though this just takes our schema and exports it. 
const { sequelize, Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const user_table = sequelize.define("user_table", {
        user_id: {
            type: Sequelize.STRING
        },
        person_name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        ad_auth: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
    });

return user_table;

};