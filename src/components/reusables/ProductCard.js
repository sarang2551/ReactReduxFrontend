import React from "react";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
//Product details {name,description,price,stock,image}
const ProductCard = (props) => {
  const { name, description, price, stock, image } = props.data;
  return (
    <Card style={{ width: "9rem" }} bg="light">
      <Card.Img variant="top" src={image} alt="Product photo" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Price: {price} SGD</ListGroupItem>
        <ListGroupItem>Stock remaining: {stock}</ListGroupItem>
      </ListGroup>
      {/* <Card.Body>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body> */}
    </Card>
  );
};
export default ProductCard;
