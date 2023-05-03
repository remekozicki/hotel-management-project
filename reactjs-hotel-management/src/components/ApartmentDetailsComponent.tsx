import {useParams} from "react-router-dom";

import RoomType from "../models/RoomType";
import {useEffect, useState} from "react";
import data from "../assets/RoomsTypesData.json";

function ApartmentDetailsComponent(): JSX.Element {

    const [rooms, setRooms] = useState<RoomType[]>([]);
    useEffect(() => {
        setRooms(data);
    }, []);



    const param = useParams();
    const specificRoom = rooms.find(room => room._id === param.id)
    console.log(specificRoom);



    return(
        <p>{specificRoom?.type}</p>
    );
}

export default ApartmentDetailsComponent