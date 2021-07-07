module.exports = app => {
    const InventoryDB = require("../controllers/controller.js");

    var router = require("express").Router();

    //create new tutorial
    router.post("/items/create", InventoryDB.create);
    
    //retreive all tutorials 
    router.get("/items/all", InventoryDB.findAll);

    // Retrieve all published Tutorials
    router.get("/published", InventoryDB.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", InventoryDB.findOne);

    // Update a Tutorial with id
    router.put("/:id", InventoryDB.update);

    // Delete a Tutorial with id
    router.delete("/:id", InventoryDB.delete);

    // Delete all Tutorials
    router.delete("/", InventoryDB.deleteAll);

app.use('/api/', router);
};