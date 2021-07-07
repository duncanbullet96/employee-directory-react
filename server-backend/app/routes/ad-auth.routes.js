module.exports = app => {
    const adAuth = require("../controllers/ad-auth.controller.js");

    var router = require("express").Router();

    //submit new authentication request
    router.post("/authenticate", adAuth.authRequest);

    //submit user authZ 
    


app.use('/auth/', router);
};