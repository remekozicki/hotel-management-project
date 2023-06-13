const mongoose = require("mongoose");
const db = require("../models");
const User = db.users;

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const { token } = require('morgan')

// Retrieve all users from the database.
exports.getAll = (req, res) => {
    User.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving list of clients."
            })
        })
};

exports.getById = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            })
        })
}

exports.getClients = (req, res) => {

    User.find(
        {
            role: "client"
        },
        {
            firstname: 1,
            lastname: 1,
            role: 1
        }
    )
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Did not find any clients"
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving clients"
            })
        })
}

exports.getEmployees = (req, res) => {

    User.find(
        {
            role: "employee"
        },
        {
            firstname: 1,
            lastname: 1,
            role: 1
        }
    )
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Did not find any employees"
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving employees"
            })
        })
}

exports.getReservationsByUserId = (req, res) => {
    const input_clientId = req.params.id;

    User.aggregate([
        {$match: {"_id": new mongoose.Types.ObjectId(input_clientId)}},
        {$unwind: "$reservations_hitory"},
        {
            $project: {
                "_id": 0,
                "reservation_id": "$reservations_hitory.reservation_id",
                "room_number": "$reservations_hitory.room_number",
                "start_date": "$reservations_hitory.dates.start_date",
                "end_date": "$reservations_hitory.dates.end_date",
                "status": "$reservations_hitory.status"
            }
        }
    ])
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Did not find any reservations for user with such id: " + input_clientId
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
                res.status(500).send({
                    message: "Error retrieving reservations"
                })
            }
        )
}

exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete user with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};


exports.register = (req, res) => {
    User.getOne({email: req.body.email})
        .then(user => {
            if (user) {
                res.json({
                    message: 'Email is already used',
                    result: 'email'
                })
            } else {
                bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
                    if (err) {
                        res.json({error: err})
                    } else {
                        let user = new User({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            password: hashedPass,
                            phone: req.body.phone,
                            address: req.body.address,
                            registered: new Date().toLocaleString()
                        })
                        user.save()
                            .then(user => {
                                res.json({})
                            })
                            .catch(error => {
                                res.json({
                                    message: 'Error!',
                                    result: 'error'
                                })

                            })
                    }
                })
            }
        })
        .catch(error => {
            res.json({
                message: 'Error!',
                result: 'error'
            })
        })
}

exports.addReservationToUser = (req, res) => {

    const reservation = {
        reservation_id: new mongoose.Types.ObjectId(req.body.reservation_id),
        room_number: req.body.room_number,
        dates: req.body.dates,
        status: "pending"
    }

    User.updateOne(
        { "_id": new mongoose.Types.ObjectId(req.body.client_id) },
        { $push: { "reservations_hitory": reservation } }
    ).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the reservation."
            });
        });
}
