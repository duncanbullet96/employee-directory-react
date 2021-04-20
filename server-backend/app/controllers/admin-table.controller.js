const db = require("../models");            //pulls in the /models/index.js file, we're pulling the "db" variable out of  
const AdminTable = db.admin_table;
const Op = db.Sequelize.Op;

// Create and Save a new admin table item
exports.create = (req, res) => {
  // Validate request


  // Create a item
  const admin_item = {
    item_id: req.body.item_id, 
    item_parent_collection: req.body.item_parent_collection,
    item_name: req.body.item_name,
    item_value: req.body.item_value
  };

  // Save item  in the database
  AdminTable.create(admin_item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the AdminTable."
      });
    });
};

// Retrieve all EmpDBs from the database.
exports.findAll = (req, res) => {
//  const item_name = req.query.item_name;
//  var condition = item_name ? { title: { [Op.like]: `%${item_name}%` } } : null;

  AdminTable.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

// Find a single AdminTable with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AdminTable.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving AdminTable with id=" + id
      });
    });
};

// Update a AdminTable by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  AdminTable.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AdminTable was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update AdminTable with id=${id}. Maybe AdminTable was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating AdminTable with id=" + id
      });
    });
};

// Delete a AdminTable with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AdminTable.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AdminTable was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete AdminTable with id=${id}. Maybe AdminTable was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete AdminTable with id=" + id
      });
    });
};

// Delete all EmpDBs from the database.
exports.deleteAll = (req, res) => {
  AdminTable.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} EmpDBs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all employees."
      });
    });
};

// find all published AdminTable
exports.findAllPublished = (req, res) => {
  AdminTable.findAll({ where: { item_name: '' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};

exports.findDepartments = (req, res) =>{
  AdminTable.findAll({
    attributes: ['item_value']
  })
  .then(data=>{
    res.send(data);
  })
}

exports.findLocations = (req, res) =>{
  AdminTable.findAll({
    attributes: ['id','item_value'],
    where: {item_parent_collection: 'adv_settings',
      item_name:'locations'}
  })
  .then(data=>{
    res.send(data);
  })
}

