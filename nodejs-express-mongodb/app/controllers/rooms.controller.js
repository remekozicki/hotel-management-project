const db = require("../models");
const Room = db.rooms;

// Retrieve all rooms from the database.
exports.getAll = (req, res) => {
    Room.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving list of rooms."
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
                    err.message || "Some error occurred while retrieving room."
            })
        })
};

exports.getWithAvailableDateAndRoomType = (req, res) => {
    const input_start_date = new Date(req.query.start);
    const input_end_date = new Date(req.query.end);
    const input_type = req.query.type

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
                                $nor: [{
                                    $and: [{"start_date": {$gte: input_start_date}},
                                        {"end_date": {$lte: input_end_date}}
                                    ]
                                },
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
                    message: "Not found rooms with such rating: %d"
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Room with typeID: %d"
            })
        })
}

exports.getWithStatus = (req, res) => {
    const input_status = req.query.status;
    const input_start_date = new Date(req.query.start);
    const input_end_date = new Date(req.query.end);

    Room.aggregate([
        {$unwind: "$rooms_array"},
        {$unwind: "$rooms_array.room_reservations"},
        {
            $project: {

                _id: 0,
                reservation_id: "$rooms_array.room_reservations._id",
                reservation_status: "$rooms_array.room_reservations.status",
                start_reservation: "$rooms_array.room_reservations.dates.start_date",
                end_reservation: "$rooms_array.room_reservations.dates.end_date",
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
                    message: "Not found rooms with such rating: %d"
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Room with typeID: %d"
            })
        })
}

exports.getWithAvgStars = (req, res) => {
    const avg_stars = Number(req.params.stars);

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
        }

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
                    message: `Cannot delete Room with id=${id}. Maybe Room was not found!`
                });
            } else {
                res.send({
                    message: "Room was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Room with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Room.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Rooms were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all rooms."
            });
        });
};
