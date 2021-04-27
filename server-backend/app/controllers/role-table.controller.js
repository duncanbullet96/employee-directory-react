const db = require("../models");            //pulls in the /models/index.js file, we're pulling the "db" variable out of  
const RoleTable = db.role_table;
const Op = db.Sequelize.Op;

// Create and Save a new User in the UserTable in MySQL
exports.createRole = (req, res) => {
  // Generate a random Unique User ID (UUID)

  function makeUUID(length) {
      var result           = [];
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcxyz';
      var charactersLength = characters.length;

      for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
    }

    var UUID = makeUUID(5);

    const roleInformation = {
        role_id: UUID,
        role_name: req.body.role_name,
        role_access_level:req.body.role_access_level
    }

    // Save item  in the database
    RoleTable.create(roleInformation)
    .then(data => {
        res.send(data);

    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Role."
        });
    });
};





// Retrieve all EmpDBs from the 
exports.getAllRoles = (req, res) =>{
  RoleTable.findAll()
  .then(data=>{
    res.send(data);
  })
}


exports.getRoleByID = (req, res) => {
const id = req.params.id;

RoleTable.findByPk(id)
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
        message: "Error retrieving role with id=" + id
    });
    });
};
  