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

// Retrieve all the rooms with specific room type
exports.getByTypeID = (req, res) => {
    const typeID = req.params.type_id;

    Room.find({type_id: typeID})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not found rooms with typeID: %s", typeID
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Room with typeID: %s", typeID
            })
        })
}

exports.create = (req, res) => {

    // Create a new room
    const room = new Room({
        room_number: req.body.room_number,
        type_id: req.body.type_id
    })

    room
        .save(room)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the room."
            });
        });
};

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
