module.exports = mongoose => {
    const roomSchema = mongoose.Schema(
        {
            type: String,
            image: String,
            size: Number,
            price: Number,
            description: String
        },
        { timestamps: true }
    );

    // roomSchema.method("toJSON", function() {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    return mongoose.model("room_types", roomSchema);
};