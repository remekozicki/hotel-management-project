const db = require("../models");
const mongoose = require("mongoose");
const Room = db.rooms;
const User = db.users;

// Retrieve all rooms from the database.
exports.getAll = (req, res) => {
    Room.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving list of room types."
            })
        })
};


exports.getById = (req, res) => {
    const id = req.params.id;

    Room.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving room type."
            })
        })
};

exports.getWithAvailableDateAndRoomType = (req, res) => {
    const input_start_date = new Date(req.body.start);
    const input_end_date = new Date(req.body.end);
    const input_type = req.body.type

    Room.aggregate([
        {$unwind: "$rooms_array"},
        {
            $unwind: {
                path: "$rooms_array.room_reservations",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {

                _id: 0,
                room_type: "$type",
                room_number: "$rooms_array.room_number",
                description: "$description",
                size: "$size",
                price: "$price",
                reservation_status: "$rooms_array.room_reservations.status",
                start_date: {
                    $toDate: "$rooms_array.room_reservations.dates.start_date"
                },

                end_date: {
                    $toDate: "$rooms_array.room_reservations.dates.end_date"
                }

            }
        },
        {
            $match: {

                $and: [
                    {
                        $or: [
                            {
                                $nor: [
                                    {$and:[
                                            {"start_date":{$gte: input_start_date}},
                                            {"end_date": {$lte: input_end_date}},
                                        ]},
                                    {$and:[
                                            {"start_date":{$lte: input_start_date}},
                                            {"end_date": {$gte: input_start_date}},
                                        ]},
                                    {$and:[
                                            {"start_date":{$lte: input_end_date}},
                                            {"end_date": {$gte: input_end_date}},
                                        ]},
                                ]
                            },
                            {"reservation_status": {$eq: "cancelled"}}

                        ]
                    },

                    {"room_type": input_type},

                ]
            }
        },

        {
            $project: {
                start_date: 0,
                end_date: 0,

            }
        },
        {
            $group: {

                _id: "$room_number"
            }
        }

    ])
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not found room types with such filters"
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving room type with such filters"
            })
        })
}

exports.getWithStatus = (req, res) => {
    const input_status = req.body.status;
    const input_start_date = new Date(req.body.start);
    const input_end_date = new Date(req.body.end);

    Room.aggregate([
        {$unwind: "$rooms_array"},
        {$unwind: "$rooms_array.room_reservations"},
        {
            $project: {

                _id: 0,
                reservation_id: "$rooms_array.room_reservations._id",
                reservation_status: "$rooms_array.room_reservations.status",
                // start_reservation: "$rooms_array.room_reservations.dates.start_date",
                // end_reservation: "$rooms_array.room_reservations.dates.end_date",
                start_date: {
                    $toDate: "$rooms_array.room_reservations.dates.start_date"
                },

                end_date: {
                    $toDate: "$rooms_array.room_reservations.dates.end_date"
                }

            }
        },
        {
            $match: {
                $and: [
                    {"start_date": {$gte: input_start_date}},
                    {"end_date": {$lte: input_end_date}},
                    {"reservation_status": {$eq: input_status}}
                ]
            }
        }
    ])
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not found room types with such status " + input_status
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving room type with status " + input_status
            })
        })
}

exports.getWithAvgStars = (req, res) => {
    const avg_stars = Number(req.body.stars);

    Room.aggregate([
        {$unwind: "$room_reviews"},
        {
            $group: {
                _id: "$type",
                avg_stars: {$avg: "$room_reviews.stars"}
            }
        },
        {
            $match: {
                avg_stars: {$gte: avg_stars}
            }
        },
        {
            $project: {
                _id: 0,
                type: "$_id",
                avg_stars: "$avg_stars"
            }
        },
        {$sort:{
                avg_stars: -1,
            }}

    ])
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not found rooms with such rating: %d", avg_stars
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Room with typeID: %d", avg_stars
            })
        })

}


exports.delete = (req, res) => {
    const id = req.params.id;

    Room.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete room type with id=${id}. Maybe room type was not found!`
                });
            } else {
                res.send({
                    message: "Room type was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete room type with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Room.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Room types were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all room types."
            });
        });
};

// exports.addReservationToRooms = (req, res) => {
//
//     const reservation = {
//         _id: new mongoose.Types.ObjectId(req.body.reservation_id),
//         client_id: new mongoose.Types.ObjectId(req.body.client_id),
//         dates: req.body.dates,
//         status: "pending"
//     };
//
//     Room.updateOne(
//         {"_id": new mongoose.Types.ObjectId(req.body.type_id)},
//         {$push: {"rooms_array.$[room].room_reservations": reservation}},
//         {arrayFilters: [{"room.room_number": req.body.room_number}]}
//     )
//     .then(data => {
//         res.send(data);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message:
//                 err.message || "Some error occurred while creating the reservation."
//         });
//     });
// }

exports.addReservation = (req, res) => {

    const reservation_id = new mongoose.Types.ObjectId();

    const reservationRooms = {
        _id: reservation_id,
        client_id: new mongoose.Types.ObjectId(req.body.client_id),
        dates: req.body.dates,
        status: "pending"
    };

    const reservationUsers = {
        reservation_id: reservation_id,
        room_number: req.body.room_number,
        dates: req.body.dates,
        status: "pending"
    };

    Room.updateOne(
        {"_id": new mongoose.Types.ObjectId(req.body.type_id)},
        {$push: {"rooms_array.$[room].room_reservations": reservationRooms }},
        {arrayFilters: [{"room.room_number": req.body.room_number}]}
    )
        .then(data => {
            // res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the reservation."
            });
        });

    User.updateOne(
        { "_id": new mongoose.Types.ObjectId(req.body.client_id) },
        { $push: { "reservations_hitory": reservationUsers } }
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

exports.addReview = (req, res) => {

    const review = {
        client_id: new mongoose.Types.ObjectId(req.body.client_id),
        stars: req.body.stars,
        body: req.body.body
    };

    Room.updateOne(
        { "_id": new mongoose.Types.ObjectId(req.body.room_id) },
        { $push: { "room_reviews": review } }
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

exports.changeReservationStatus = (req, res) => {


    Room.updateMany(
        { "rooms_array.room_reservations._id": new mongoose.Types.ObjectId(req.body.reservation_id) },
        [
            {
                $set: {
                    rooms_array: {
                        $ifNull: [
                            {
                                $map: {
                                    input: "$rooms_array",
                                    in: {
                                        $mergeObjects: [
                                            "$$this",
                                            {
                                                room_reservations: {
                                                    $map: {
                                                        input: "$$this.room_reservations",
                                                        in: {
                                                            $cond: [
                                                                { $eq: ["$$this._id", new mongoose.Types.ObjectId(req.body.reservation_id)] },
                                                                { $mergeObjects: ["$$this", { status: req.body.status }] },
                                                                "$$this"
                                                            ]
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            },
                            "$rooms_array"
                        ]
                    }
                }
            }
        ]
    )

    .then(data => {
        // res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the reservation."
        });
    });
    User.updateOne(
        { "reservations_hitory.reservation_id": new mongoose.Types.ObjectId(req.body.reservation_id) },
        { $set: { "reservations_hitory.$.status": req.body.status } }
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
