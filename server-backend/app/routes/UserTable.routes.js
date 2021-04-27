module.exports = app => {
    const userTable = require("../controllers/userTable.controller.js");

    var router = require("express").Router();

    //create new user
    router.post("/new", userTable.createUser);
    
    //get all users
    router.get("/all", userTable.getAllUsers);

    router.delete("/:id", userTable.deleteUser);

    router.get("/:username", userTable.getUserbyUsername)
    


app.use('/api/admin/users', router);
};