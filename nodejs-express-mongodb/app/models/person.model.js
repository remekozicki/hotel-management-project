module.exports = mongoose => {
    const personSchema = mongoose.Schema(
        {
            firstname: String,
            lastname: String,
            email: String,
            phone: String,
            address: String,
            registered: String,
            // salary: Number?

        },
        { timestamps: true }
    );

    // roomSchema.method("toJSON", function() {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    const people = mongoose.model("person", personSchema);
    return people;
};