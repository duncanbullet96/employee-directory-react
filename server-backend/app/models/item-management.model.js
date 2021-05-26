// ill take "things you should have called database schema for 200 Alex"
// really though this just takes our schema and exports it. 
const { sequelize, Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const item_management = sequelize.define("item_management_", {
        item_id: {
            type: Sequelize.STRING
        },
        item_owner_id:{
            type: Sequelize.STRING
        }
    });

return item_management;

};