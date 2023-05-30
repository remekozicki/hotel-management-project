
module.exports = app => {
    const room = require("../controllers/rooms.controller.js");

    let router = require("express").Router();

    router.get("/", room.getAll);
    router.get("/:type_id", room.getByTypeID);
    router.post("/", room.create);
    router.delete("/:id", room.delete);
    router.delete("/", room.deleteAll);

    app.use('/api/rooms', router);
}