module.exports = app => {
    const ItemManagement = require("../controllers/item-management.controller.js");

    var router = require("express").Router();

    //create item mangement mapping
    router.post("/new", ItemManagement.createItemAssignment);
    
    //get mappings
    router.get("/allID", ItemManagement.getAssignmentsWithID);

    router.get("/all", ItemManagement.getAssignments)

    //get single mapping by id
    router.get("/:id", ItemManagement.getAssignmentByID);

    router.delete("/:id", ItemManagement.deleteAssignmentbyID);

    //get the item assignments for the user id
    router.get("/ownership/:userId", ItemManagement.getAssignmentsForUser);
    


app.use('/api/admin/item_management', router);
};

