module.exports = app => {
    const ItemManagement = require("../controllers/item-management.controller.js");

    var router = require("express").Router();

    //create new user
    router.post("/new", ItemManagement.createItemAssignment);
    
    //get all users
    router.get("/all", ItemManagement.getAssignments);

    //get single role by id
    router.get("/:id", ItemManagement.getAssignmentByID);
    


app.use('/api/admin/item_management', router);
};

