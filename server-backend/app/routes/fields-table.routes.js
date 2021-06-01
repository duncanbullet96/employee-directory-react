module.exports = app => {
    const fields = require("../controllers/fields-table.controller");

    var router = require("express").Router();

    //submit new authentication request
    router.get("/all", fields.getAllFields);

    //submit user authZ 
    


app.use('/api/admin/fields', router);
};