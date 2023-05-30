const db = require("../models");
const Review = db.reviews;

exports.getAll = (req, res) => {
    Review.find()
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

exports.deleteAll = (req, res) => {
    Review.deleteMany({})
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