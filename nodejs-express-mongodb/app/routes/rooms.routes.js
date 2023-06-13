const room = require("../controllers/rooms.controller");

module.exports = app => {
    const room = require("../controllers/rooms.controller.js");

    let router = require("express").Router();

    router.get("/", room.getAll);
    router.get("/id/:id", room.getById)

    router.post("/stars", room.getWithAvgStars);
    router.post("/dates", room.getWithAvailableDateAndRoomType);
    router.post("/status",room.getWithStatus);
    router.post("/addReservation", room.addReservation);
    router.post("/addReview", room.addReview);
    router.post("/changeStatus", room.changeReservationStatus);
    // router.post("/addReservation", room.addReservationToRooms);

    router.delete("/id/:id", room.delete);
    router.delete("/", room.deleteAll);

    app.use('/api/rooms', router);
}