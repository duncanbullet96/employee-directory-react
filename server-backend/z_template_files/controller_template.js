const db = require("../models");            //pulls in the /models/index.js file, we're pulling the "db" variable out of 
const my_table = db.my_table;


// Create and Save a new User in the UserTable in MySQL
exports.myCustomSqlFunction = (req, res) => {
  // Generate a random Unique User ID (UUID)

    const dataToSendToSQL = {
        column1:req.body.person_name,
        column2: req.body.username,
        colum3: req.body.ad_auth, 
    }

    // Save item  in the database
    my_table.create(dataToSendToSQL)
    .then(data => {
        res.send(data);

    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the item."
        });
    });
};





// Retrieve all EmpDBs from the 
exports.getAllUsers = (req, res) =>{
  UserTable.findAll()
  .then(data=>{
    res.send(data);
  })
}

 