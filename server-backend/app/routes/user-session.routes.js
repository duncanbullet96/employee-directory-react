module.exports = app => {
    const UserSession = require("../controllers/user-session.controller.js");

    var router = require("express").Router();

    //create new user session
    router.post("/new", UserSession.createSession);
    

    //get single session by id
    router.get("/:id", UserSession.findSessionbyID);

    router.get("/validate/:id", UserSession.validateSession);


    router.delete("/:id", UserSession.removeSession);


    
    



app.use('/api/session', router);
};

