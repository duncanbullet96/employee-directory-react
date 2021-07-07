const db = require("../models");            //pulls in the /models/index.js file, we're pulling the "db" variable out of  
const EmpDB = db.wp_participants_database;
const Op = db.Sequelize.Op;



// Create and Save a new EmpDB
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a EmpDB
  const employee = {
    private_id: req.body.private_id,
    first_name: req.body.first_name, 
    last_name: req.body.last_name ,
    phone: req.body.phone ,
    alt_phone: req.body.alt_phone,
    email: req.body.email ,
    department_id: req.body.department_id ,
    location_id: req.body.location_id ,
    title: req.body.title ,
  };

  // Save EmpDB in the database
  EmpDB.create(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EmpDB."
      });
    });
};





// Retrieve all EmpDBs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  EmpDB.findAll({ where: condition })
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



// pretty find all - formatted
exports.findAllFormatted = (req, res) =>{
  const formattedUserQuery = (`
  select 
  pd.id, 
      pd.first_name, 
      pd.last_name,
      pd.phone, 
      pd.alt_phone,
      pd.email,
      pd.title,
      adt1.item_value as 'department',
      adt2.item_value as 'location',
      pd.createdAt, 
      pd.updatedAt
  from
      admin_tables adt1,
      admin_tables adt2,
      wp_participants_databases pd
  where 
       pd.department_id = adt1.id
      and pd.location_id = adt2.id

  `)
  EmpDB.sequelize.query(formattedUserQuery, {type: EmpDB.sequelize.QueryTypes.SELECT})
.then(data=>{
  res.send(data);
})
}




// pretty find all - formatted
exports.findbyDepartment = (req, res) =>{
  const data = req.params.id;
  const location_id = req.body.location_id;
  const formattedUserQuery = (`
  select 
  pd.id, 
      pd.first_name, 
      pd.last_name,
      pd.phone, 
      pd.alt_phone,
      pd.email,
      pd.title,
      adt1.item_value as 'department',
      adt2.item_value as 'location',
      pd.createdAt, 
      pd.updatedAt
  from
      admin_tables adt1,
      admin_tables adt2,
      wp_participants_databases pd
  where 
      adt1.id = ${data}
      and pd.department_id = adt1.id
      and pd.location_id = adt2.id

  `)
  EmpDB.sequelize.query(formattedUserQuery, {type: EmpDB.sequelize.QueryTypes.SELECT})
.then(data=>{
  res.send(data);
})
}




// Find a single EmpDB with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  EmpDB.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving EmpDB with id=" + id
      });
    });
};

// Update a EmpDB by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  EmpDB.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "EmpDB was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update EmpDB with id=${id}. Maybe EmpDB was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating EmpDB with id=" + id
      });
    });
};

// Delete a EmpDB with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  EmpDB.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "EmpDB was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete EmpDB with id=${id}. Maybe EmpDB was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete EmpDB with id=" + id
      });
    });
};

// Delete all EmpDBs from the database.
exports.deleteAll = (req, res) => {
  EmpDB.destroy({
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

// find all published EmpDB
exports.findAllPublished = (req, res) => {
  EmpDB.findAll({ where: { published: true } })
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



// pretty find all - formatted
exports.findbyNames = (req, res) =>{
  const data = req.params.search
  const formattedUserQuery = (`
  select 
  pd.id, 
      pd.first_name, 
      pd.last_name
  from

      wp_participants_databases pd
  where 
      pd.first_name like '%${data}%'
      or pd.last_name like '%${data}%'

  `)
  EmpDB.sequelize.query(formattedUserQuery, {type: EmpDB.sequelize.QueryTypes.SELECT})
.then(data=>{
  res.send(data);
})
}


exports.findbyOwnership = (req, res) =>{

  
}