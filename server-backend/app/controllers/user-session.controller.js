const { user_session } = require("../models");
const db = require("../models");            //pulls in the /models/index.js file, we're pulling the "db" variable out of  
const UserSession = db.user_session;
const Op = db.Sequelize.Op;
const moment = require('moment');
const { now } = require("moment");


const fs = require("fs");

const config_file = fs.readFileSync('config.json');
const session_config = JSON.parse(config_file);

console.log(session_config);
console.log(session_config.user_session_config.sessionTimeout);

// Create and Save a new User in the UserTable in MySQL
exports.createSession = (req, res) => {
  // Generate a random Unique User ID (UUID)
  function makeUUID(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  }

  var id = makeUUID(12);
  var currDate = new Date();
  var expire_date = currDate.setMinutes(currDate.getMinutes()+ session_config.user_session_config.sessionTimeout);



  const sessionInfo = {
      session_id : id,
      username : req.body.username, 
      expires : expire_date
  }

    
    // Save item  in the database
    UserSession.create(sessionInfo)
    .then(data => {
        res.send(data);

    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the session."
        });
    });
};




exports.getAllFields = (req, res) =>{
    UserSession.findAll()
    .then(data =>{
        res.send(data);
    })
};





exports.findSessionbyID = (req, res) =>{
    const session_id = req.params.id
    UserSession.findAll({
        where : {session_id : session_id}
    })
    .then(data =>{
        res.json(data);
    })
    .catch(err => {
        res.status(401).send({
        message:
            err.message || "Session Expired"
        });
    });
};





exports.removeSession = (req, res) =>{
    const session_id = req.params.id
    UserSession.destroy({
        where : {session_id : session_id}
    })
    .then(data=>{
        res.status(200).send({
            message: "session removed"
        })
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing the session."
        });
    });
};
