const db = require("../models");
const Client = db.clients;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = (req, res) => {
    Client.getOne({email: req.body.email})
        .then(user => {
            if(user){
                res.json({
                    message: 'Email is already used',
                    result: 'email'
                })
            }
            else {
                bcrypt.hash(req.body.password, 10 , function (err, hashedPass){
                    if(err){
                        res.json({error: err})
                    }
                    else{
                        let user = new Client({
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
                                res.json({

                                })
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


// Retrieve all Rooms from the database.
exports.getAll = (req, res) => {
    Client.find()
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

exports.getOne = (req, res) => {
    const id = req.body._id;

    Client.findById(id)
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
                message: "Error retrieving client with id: %s", id
            })
        })
}

exports.deleteAll = (req, res) => {
    Client.deleteMany({})
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

exports.delete = (req, res) => {
    const id = req.params._id;

    Client.findByIdAndRemove(id)
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