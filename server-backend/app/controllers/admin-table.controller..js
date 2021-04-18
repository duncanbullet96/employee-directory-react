const db = require("../models");            //pulls in the /models/index.js file, we're pulling the "db" variable out of  
const AdminTable = db.admin_table;
const Op = db.Sequelize.Op;

// Create and Save a new AdminTable
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a AdminTable
  const item = {
    item_id:this.req.item_id, 
    item_parent_collection: this.req.item_parent_collection,
    item_name: this.req.item_name,
    item_value: this.req.item_value

  };

  // Save AdminTable in the database
  AdminTable.create(employee)
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
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  AdminTable.findAll({ where: condition })
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
  AdminTable.findAll({ where: { published: true } })
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