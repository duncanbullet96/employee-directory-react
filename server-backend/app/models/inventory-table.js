// ill take "things you should have called database schema for 200 Alex"
// really though this just takes our schema and exports it. 
const { sequelize, Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const inventory_list = sequelize.define("inventory_list_", {
        item_name: {
            type: Sequelize.STRING
        },
        category_name: {
            type: Sequelize.STRING
        },
        location_name: {
            type: Sequelize.STRING
        },
        qty: {
            type: Sequelize.STRING
        },
        trackit_id: {
            type: Sequelize.STRING
        },
        created_by: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        }
        
    });

return inventory_list;

};