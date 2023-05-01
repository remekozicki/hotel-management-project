import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React, {useState, useEffect} from 'react';
import data from '../assets/RoomsTypesData.json';
import RoomType from "../models/RoomType";
import CardComponent from "./CardComponent";

function RoomsComponent(): JSX.Element {

    const [rooms, setRooms] = useState<RoomType[]>([]);
    useEffect(() => {
        setRooms(data);
    }, []);

    return (
        <div className='wrapper'>
            <h2 className='p-3'>Available rooms:</h2>
            <div className='d-flex flex-wrap gap-5 justify-content-center'>
                {rooms.map((roomType: RoomType) => {
                    return <CardComponent _id={roomType._id} type={roomType.type} image={roomType.image}
                                          size={roomType.size} price={roomType.price}
                                          description={roomType.description}></CardComponent>
                })}
            </div>
        </div>
    );
}

export default RoomsComponent
