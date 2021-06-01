const { fieldsTable } = require("../models");
const db = require("../models");            //pulls in the /models/index.js file, we're pulling the "db" variable out of  
const FieldsTable = db.fieldsTable;
const Op = db.Sequelize.Op;

// Create and Save a new User in the UserTable in MySQL
exports.createField = (req, res) => {
  // Generate a random Unique User ID (UUID)


    const fieldInfo = {
        field_name: req.body.field_name,
        enabled: req.body.enabled
    }

    // Save item  in the database
    FieldsTable.create(fieldInfo)
    .then(data => {
        res.send(data);

    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the field."
        });
    });
};

exports.getAllFields = (req, res) =>{
    FieldsTable.findAll()
    .then(data =>{
        res.send(data);
    })
}


