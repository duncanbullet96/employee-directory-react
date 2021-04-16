const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('body-parser');

const app = express();

var corsOptions = {
    orgin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse request of content-type - application/json, etc
app.use(bodyParser.json());

app.use(urlencoded({extended: true}));

//a simple route for us
app.get("/", (req, res)=> {
    res.json({message: "This is the express server for the user phone list for the HC Intranet"})
});


require("./app/routes/routes.js")(app);

//set port and listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

const db = require("./app/models");
db.sequelize.sync();
//db.sequelize.sync({force: true}).then( () => {
//    console.log("Drop and re-sync DB");
//});

