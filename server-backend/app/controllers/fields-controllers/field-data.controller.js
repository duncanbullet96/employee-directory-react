const { fieldData } = require("../../models");
const db = require("../../models");           //pulls in the /models/index.js file, we're pulling the "db" variable out of  
const FieldData = db.fieldData;
const Op = db.Sequelize.Op;

// Create and Save a new User in the UserTable in MySQL
exports.create = (req, res) => {
  // Generate a random Unique User ID (UUID)


  const data = {
    parent_field_id: req.body.parent_field_id,
    parent_field_name: req.body.parent_field_name,
    field_value: req.body.field_value
  }

  // Save item  in the database
  FieldData.create(data)
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

exports.findAll = (req, res) => {
  FieldData.findAll()
    .then(data => {
      res.send(data);
    })
}

exports.deleteByID = (req, res) => {
  const id = req.params.id;
  FieldData.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "rowid was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete rowid with id=${id}. Maybe rowid was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete rowid with id=" + id
      });
    });
}


exports.findbyFieldName = (req, res) => {
  const field_name = req.params.data;
  const fieldNameQuery = (`
  select *
  from
    fielddata_s
  where 
    parent_field_name like '${field_name}'
  `)
  FieldData.sequelize.query(fieldNameQuery, { type: FieldData.sequelize.QueryTypes.SELECT })
    .then(data => {
      if(data.length <= 0){
        res.send('no data, bad api request?')
      }
      else{
      res.send(data);
      }
    })
    .catch(err =>{
      res.send(err)
    })
}