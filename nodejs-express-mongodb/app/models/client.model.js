module.exports = mongoose => {
    const clientSchema = mongoose.Schema(
        {
            firstname: String,
            lastname: String,
            email: String,
            password: String,
            phone: String,
            address: String,
            registered: String,

        },
        { timestamps: true }
    );

    // roomSchema.method("toJSON", function() {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    return mongoose.model("client", clientSchema);
};