module.exports = mongoose => {
    const userSchema = mongoose.Schema(
        {
            firstname: String,
            lastname: String,
            email: String,
            password: String,
            phone: String,
            address: {
                city: String,
                street: String,
                building_number: Number
            },
            registered: String,
            reservations_history: [],
            role: String

        },
        { timestamps: true }
    );

    // roomSchema.method("toJSON", function() {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    return mongoose.model("users", userSchema);
};