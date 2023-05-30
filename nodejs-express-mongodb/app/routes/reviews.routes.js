
module.exports = app => {
    const review = require("../controllers/reviews.controller.js");

    let router = require("express").Router();

    router.get("/", review.getAll);
    router.delete("/", review.deleteAll);

    app.use('/api/reviews', router);


}