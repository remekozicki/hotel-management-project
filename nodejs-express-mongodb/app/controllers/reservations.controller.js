const db = require("../models");
const Reservation = db.reservations;

exports.getAll = (req, res) => {
    Reservation.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving list of reservations."
            })
        })
};
