const db = require("../models");
const Room = db.room_types;

// Retrieve all room types from the database.
exports.getAll = (req, res) => {
    Room.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving list of types of rooms."
            })
        })
};
// Find a single Room with an id
exports.getOne = (req, res) => {
    const id = req.body._id;

    Room.findById(id)
        .then(data =>{
            if (!data){
                res.status(404).send({
                    message: "Not found Rooms with id: %s", id
                })
            }else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Room with id: %s", id
            })
        })
}
// Create and Save a new Room
// exports.create = (req, res) =>{
//     if (!req.body.type) {
//         res.status(400).send({ message: "Content can not be empty!" });
//         // return;
//     }
//
//     const room = new Room({
//         type: req.body.type,
//         image: req.body.image? req.body.image: "",
//         size: req.body.size,
//         price: req.body.price,
//         description: req.body.description
//     })
//
//     if (req.file){
//         room.image = req.file.path
//     }
//     room
//         .save(room)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the Room."
//             })
//         })
// }
// Delete a Room with the specified id in the request

// Create and Save a new Room without file
exports.create = (req, res) => {

    // Create a Room Type
    const room = new Room({
        type: req.body.type,
        image: req.body.image? req.body.image: "",
        size: req.body.size,
        price: req.body.price,
        description: req.body.description
    })

    // Save room type in the database
    room
        .save(room)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the room type."
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params._id;

    Room.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Room with id=${id}. Maybe Room Type was not found!`
                });
            } else {
                res.send({
                    message: "Room Type was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Room Type with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
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
                    err.message || "Some error occurred while removing all rooms."
            });
        });
};


