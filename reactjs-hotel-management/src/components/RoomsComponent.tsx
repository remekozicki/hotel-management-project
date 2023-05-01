import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React, {useState, useEffect} from 'react';
import data from '../assets/RoomsTypesData.json';
import RoomType from "../models/RoomType";

function RoomsComponent(): JSX.Element {

    const [rooms, setRooms] = useState<RoomType[]>([]);
    useEffect(() => {
        setRooms(data);
    }, []);

    return (
        <div className='wrapper'>
            <h2 className='p-3'>Available rooms:</h2>
            <div className='d-flex flex-wrap gap-5 justify-content-center'>
                {rooms.map((room: RoomType) => {
                    return (
                        <Card style={{width: '18rem'}}>
                            <Card.Img variant="top" src="holder.js/100px180?text=Image cap"/>
                            <Card.Body>
                                <Card.Title>{room.type}</Card.Title>
                                <Card.Text>
                                    {room.description}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>size: {room.size}</ListGroup.Item>
                                <ListGroup.Item>price: {room.price}$</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href="#">Show room details</Card.Link>
                            </Card.Body>
                        </Card>)
                })}
            </div>
        </div>
    );
}

export default RoomsComponent
