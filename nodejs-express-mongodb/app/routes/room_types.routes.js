
module.exports = app => {
    const room = require("../controllers/room_types.controller.js");

    let router = require("express").Router();

    // Create a new room type
    router.post("/", room.create);

    // Retrieve all room types
    router.get("/", room.getAll);

    // Retrieve a Room Type with id

    // Retrieve a single room type with id
    router.get("/:id", room.getOne);

    // Update a room type with id
    // router.put("/:id", room.update);

    // Delete a room type with id
    router.delete("/:id", room.delete);

    // Delete all room types
    router.delete("/", room.deleteAll);

    app.use('/api/room_types', router);
};