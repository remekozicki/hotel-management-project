import { createContext, useEffect, useState} from "react";
import RoomsDataService from "../services/rooms.service.js";

export const RoomsContext = createContext();

function RoomsContext(props) {

    const [roomsArray, setRoomsArray] = useState([]);

    useEffect(() => {
        retrieveRooms();
    }, []);

    const retrieveRooms = () => {
        RoomsDataService.getAll()
            .then(response => {
                setRoomsArray(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

}

export default RoomsContext;

