module.exports = app => {
    const RoleTable = require("../controllers/role-table.controller.js");

    var router = require("express").Router();

    //create new user
    router.post("/new", RoleTable.createRole);
    
    //get all users
    router.get("/all", RoleTable.getAllRoles);

    //get single role by id
    router.get("/:id", RoleTable.getRoleByID)
    


app.use('/api/admin/roles', router);
};

