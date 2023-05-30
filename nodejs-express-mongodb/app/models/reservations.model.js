module.exports = mongoose => {
    const reservationSchema = mongoose.Schema(
        {
            client_id: String,
            start_date: String,
            end_date: String,
            status: String,
            room_id: String
        },
        { timestamps: true }
    );

    return mongoose.model("reservations", reservationSchema);
};
