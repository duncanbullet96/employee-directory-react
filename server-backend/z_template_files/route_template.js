//thhis is how we build the api 
// we take the custom sql commands we made in the controller table, impor them and use the express router package to make api urls 
module.exports = app => {
    const mytable = require("../controllers/mytable.controller.js");

    var router = require("express").Router();

    //router.<rest function>("<url we want this to be accessed from>", <exported controller item>.<a function we made in the controller>)
    router.get("/", mytable.myCustomSqlFunction);

    

    


app.use('/api/admin/users', router);//use this base url with the above rest commands
};