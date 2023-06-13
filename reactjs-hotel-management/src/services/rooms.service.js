import http from "../http-common"

class RoomsDataService {

    getAll() {
        return http.get("/rooms");
    }

    getById(id) {
        return http.get(`rooms/id/${id}`)
    }

    getWithAvgStars(data) {
        return http.post("rooms/stars", data);
    }

    getWithAvailableDateAndRoomType(data) {
        return http.post("rooms/dates", data);
    }

    getWithStatus(data) {
        return http.post("rooms/status", data);
    }

    addReservationToRooms(data) {
        return http.post("rooms/addReservation", data);
    }

    delete(id) {
        return http.delete(`/rooms/id/${id}`);
    }

    deleteAll() {
        return http.delete(`/rooms`);
    }

}

export default new RoomsDataService();
