import RoomType from "../models/RoomType";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import {useParams} from "react-router-dom";


function CardComponent(roomType: RoomType): JSX.Element {

    return (
        <Card style={{width: '20rem'}}>
            <Card.Img variant="top" src={roomType.image} style={{height:"230px"}}/>
            <Card.Body>
                <Card.Title>{roomType.type}</Card.Title>
                <Card.Text className=''
                style={{minHeight: "100px"}}
                >
                    {roomType.description}
                </Card.Text>
            </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>size: {roomType.size}</ListGroup.Item>
                    <ListGroup.Item>price: {roomType.price}$</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link className="btn btn-primary stretched-link "
                        href={'/details/' + roomType._id}>
                        Show room details
                    </Card.Link>
                </Card.Body>
        </Card>)
}

export default CardComponent;
