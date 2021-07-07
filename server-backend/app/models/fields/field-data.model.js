// ill take "things you should have called database schema for 200 Alex"
// really though this just takes our schema and exports it. also will create the schema in the DB if it doesn't already exist
const { sequelize, Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const fieldData = sequelize.define("fieldData_", {
        parent_field_id:{
            type: Sequelize.STRING
        },
        parent_field_name: {
            type: Sequelize.STRING
        },
        field_value:{
            type: Sequelize.STRING
        },

    });


return fieldData;

};