const { field_AltPhone } = require("../../models");
const db = require("../../models");           //pulls in the /models/index.js file, we're pulling the "db" variable out of  
const fieldAltPhone = db.field_AltPhone;
const Op = db.Sequelize.Op;

// Create and Save a new User in the UserTable in MySQL
exports.createField = (req, res) => {
  // Generate a random Unique User ID (UUID)


    const data = {
        master_field_id : req.body.master_field_id,
        alt_phone_type : req.body.alt_phone_type
    }

    // Save item  in the database
    fieldAltPhone.create(data)
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

exports.findAll = (req, res) =>{
    fieldAltPhone.findAll()
    .then(data =>{
        res.send(data);
    })
}


