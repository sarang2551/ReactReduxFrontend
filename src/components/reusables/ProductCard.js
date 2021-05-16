import React from "react";
import Card from "react-bootstrap/Card";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
//Product details {name,description,price,stock,image}
const ProductCard = (props) => {
  const { name, description, price, stock, image, index } = props.data;
  const [selectedImageIndex, setSelectedImage] = React.useState();
  const onClickEdit = (e) => {
    e.preventDefault();
    props.onSelect && props.onSelect(index);
    props.editOnClickEvent && props.editOnClickEvent();
  };
  return (
    <Card style={{ width: "9rem" }} bg="light" text="dark" border="success">
      <Carousel
        activeIndex={selectedImageIndex}
        interval={null}
        onSelect={(i) => {
          setSelectedImage(i);
        }}
        direction="next"
      >
        {image.map((img, index) => {
          return (
            <Carousel.Item index={index} key={index}>
              <Card.Img variant="top" src={img} alt="Product Image" />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Price: {price} SGD</ListGroupItem>
        <ListGroupItem>Stock remaining: {stock}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Button
          block
          variant="primary"
          style={{ marginTop: "0" }}
          onClick={onClickEdit}
        >
          Edit
        </Button>
        <Button block variant="danger">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};
export default ProductCard;
