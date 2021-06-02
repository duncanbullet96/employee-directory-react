module.exports = app => {
    const fields = require("../controllers/fields-table.controller");
    const FieldData = require("../controllers/fields-controllers/field-data.controller.js");

    var router = require("express").Router();

    //submit new authentication request
    router.get("/all", fields.getAllFields);

    router.get("/find/:data", fields.findFieldByName )

    //alt phone settings
    router.get("/:data", FieldData.findbyFieldName)

    //alt
    router.delete("/:data/:id", FieldData.deleteByID )

    //create new alt phone field
    router.post("/:data/new", FieldData.create)
    


app.use('/api/admin/fields', router);
};