// ill take "things you should have called database schema for 200 Alex"
// really though this just takes our schema and exports it. 
const { sequelize, Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const user_session = sequelize.define("user_session_", {
        username: {
            type: Sequelize.STRING
        },
        session_id: {
            type: Sequelize.STRING
        },
        expires: {
            type: Sequelize.STRING
        },
    });

return user_session;

};