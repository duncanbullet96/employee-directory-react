module.exports = app => {
    const adAuth = require("../controllers/ad-auth.controller.js");

    var router = require("express").Router();

    //submite new auth request
    router.post("/", adAuth.authRequest);
    


app.use('/auth/login', router);
};