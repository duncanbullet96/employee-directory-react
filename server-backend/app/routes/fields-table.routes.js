module.exports = app => {
    const fields = require("../controllers/fields-table.controller");
    const fieldAltPhone = require("../controllers/fields-controllers/field-altPhone.controller.js");

    var router = require("express").Router();

    //submit new authentication request
    router.get("/all", fields.getAllFields);

    //alt phone field data
    router.get("/alt_phone", fieldAltPhone.findAll)
    


app.use('/api/admin/fields', router);
};