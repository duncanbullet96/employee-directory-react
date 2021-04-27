// ill take "things you should have called database schema for 200 Alex"
// really though this just takes our schema and exports it. 
const { sequelize, Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const role_table = sequelize.define("role_table", {
        role_id: {
            type: Sequelize.STRING
        },
        role_name: {
            type: Sequelize.STRING
        },
        role_access_level:{
            type: Sequelize.INTEGER
        }
    });

return role_table;

};