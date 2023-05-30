module.exports = mongoose => {
    const roomSchema = mongoose.Schema(
        {
            room_number: Number,
            type_id: String
        },
        { timestamps: true }
    );

    // roomSchema.method("toJSON", function() {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    return mongoose.model("rooms", roomSchema);
};