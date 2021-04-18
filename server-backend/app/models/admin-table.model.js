// ill take "things you should have called database schema for 200 Alex"
// really though this just takes our schema and exports it. 
const { sequelize, Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const admin_table = sequelize.define("admin_table", {
        item_id: {
            type: Sequelize.STRING
        },
        item_parent_collection: {
            type: Sequelize.STRING
        },
        item_name: {
            type: Sequelize.STRING
        },
        item_value: {
            type: Sequelize.STRING
        },
    });

return admin_table;

};