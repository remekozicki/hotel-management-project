module.exports = app => {
    const reservation = require("../controllers/reservations.controller.js");

    let router = require("express").Router();

    router.get("/", reservation.getAll);

    app.use('/api/reservations', router);
}