module.exports = app => {
    const userTable = require("../controllers/userTable.controller.js");

    var router = require("express").Router();

    //create new user
    router.post("/new", userTable.createUser);
    
    //get all users
    router.get("/all", userTable.getAllUsers);

    // find user by their username
    router.get("/:data", userTable.findUserByUsername );

    router.get("/:id", userTable.getUserByID);

    //delete user by id
    router.delete("/:id", userTable.removeUserbyId);
    


app.use('/api/admin/users', router);
};