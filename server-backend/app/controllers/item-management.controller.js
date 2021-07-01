
const db = require("../models");            //pulls in the /models/index.js file, we're pulling the "db" variable out of  
const ItemManagement = db.item_management;
const Op = db.Sequelize.Op;

exports.createItemAssignment = (req, res) => {
    const Mappings ={
        item_id: req.body.item_id,
        item_owner_id: req.body.item_owner_id
    }
    ItemManagement.create(Mappings)
    .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Item Assignment Mapping."
        });
      });
}


exports.getAssignments = (req, res) =>{
    const itemOwnerQuery = (`
    select 
        im.id,
        adt.id as user_id, 
        adt.item_value, 
        (CONCAT(ut.username,' (',ut.person_name,')' )) as item_manager
    from
        item_management_s im,
        user_tables ut,
        admin_tables adt
    where 
        im.item_id = adt.id
        and im.item_owner_id = ut.id
    `)
    ItemManagement.sequelize.query(itemOwnerQuery, {type: ItemManagement.sequelize.QueryTypes.SELECT})
  .then(data=>{
    res.send(data);
  })
}



exports.getAssignmentsWithID = (req, res) =>{
  ItemManagement.findAll()
.then(data=>{
  res.send(data);
})
}


exports.getAssignmentByID = (req, res) => {
const id = req.params.id;

    ItemManagement.findByPk(id)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(500).send({
                message: "Error retrieving role with id=" + id
            });
            });
};


exports.deleteAssignmentbyID = (req, res) =>{
  const id = req.params.id;

    ItemManagement.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Item was deleted successfully!"
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
}



exports.getAssignmentsForUser = (req, res) =>{
  owner_id = req.params.userId
  const itemOwnerQuerybyID = (`
  select 
  im.id,
  adt.id as admin_item_id,
  adt.item_name as admin_item_type,
  ut.id as user_id,
  adt.item_value
from
  item_management_s im,
  user_tables ut,
  admin_tables adt
where 
  im.item_id = adt.id
  and ut.id = ${owner_id}
  and im.item_owner_id = ut.id
  `)
  ItemManagement.sequelize.query(itemOwnerQuerybyID, {type: ItemManagement.sequelize.QueryTypes.SELECT})
.then(data=>{
  res.send(data);
})
}

  
