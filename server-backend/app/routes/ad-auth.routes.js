module.exports = app => {
    const adAuth = require("../controllers/ad-auth.controller.js");

    var router = require("express").Router();

    //submit new authentication request
    router.post("/authenticate", adAuth.authRequest);

    //submit new authorization requst
    router.post('/authorize', adAuth.userAdminAuthorization)


    


app.use('/auth/', router);
};