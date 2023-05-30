module.exports = mongoose => {
    const reviewsSchema = mongoose.Schema(
        {
            client_id: String,
            stars: Number,
            body: String
        },
        { timestamps: true }
    );

    // roomSchema.method("toJSON", function() {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    return mongoose.model("reviews", reviewsSchema);
};