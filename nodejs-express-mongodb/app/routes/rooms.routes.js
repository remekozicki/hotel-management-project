
module.exports = app => {
    const room = require("../controllers/rooms.controller.js");

    let router = require("express").Router();

    // Create a new room
    router.post("/", room.create);

    // Retrieve all rooms
    router.get("/", room.getAll);

    // Retrieve a Room with id

    // Retrieve a single Tutorial with id
    router.get("/:id", room.getOne);

    // Update a Tutorial with id
    // router.put("/:id", room.update);

    // Delete a Tutorial with id
    router.delete("/:id", room.delete);

    // Delete all Tutorials
    router.delete("/", room.deleteAll);

    app.use('/api/room_types', router);
};