module.exports = app => {

    const user = require("../controllers/users.controller");

    let router = require("express").Router();

    router.get("/", user.getAll);
    router.get("/id/:id", user.getById);
    router.get("/clients", user.getClients);
    router.get("/employees", user.getEmployees);
    router.get("/reservations/:id", user.getReservationsByUserId);
    router.post("/addReservation", user.addReservationToUser);
    router.post("/createUser", user.createNewUser);
    router.delete("/id/:id", user.delete);
    router.delete("/", user.deleteAll);

    app.use('/api/users', router);


}