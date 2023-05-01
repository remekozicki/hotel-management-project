import RoomType from "../models/RoomType";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";

function CardComponent(roomType: RoomType): JSX.Element {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src="holder.js/100px180?text=Image cap"/>
            <Card.Body>
                <Card.Title>{roomType.type}</Card.Title>
                <Card.Text>
                    {roomType.description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>size: {roomType.size}</ListGroup.Item>
                <ListGroup.Item>price: {roomType.price}$</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Show room details</Card.Link>
            </Card.Body>
        </Card>)
}

export default CardComponent;
