
module.exports = app => {
    const room = require("../controllers/rooms.controller.js");

    let router = require("express").Router();

    router.get("/", room.getAll);
    router.get("/id/:id", room.getById);
    router.get("/stars/:stars", room.getWithAvgStars);
    router.get("/dates", room.getWithAvailableDateAndRoomType);
    router.get("/status",room.getWithStatus);
    router.delete("/id/:id", room.delete);
    router.delete("/", room.deleteAll);

    app.use('/api/rooms', router);
}