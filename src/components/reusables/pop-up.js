import React from "react";
import { addProduct } from "../../reduxOld/actions";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ImageUploadMUI from "./imageUploadMui";
function MyVerticallyCenteredModal(props) {
  const [formData, setFormData] = React.useState({
    name: "",
    price: 0,
    image: "",
    description: "",
    stock: 0
  });
  function settingResizeImage({ resizedBase64 }) {
    setFormData({ image: resizedBase64 });
  }
  function onInfoChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function sendToParentComponent(e) {
    e.preventDefault();
    props.handleAddProduct && props.handleAddProduct(formData);
    props.onHide();
  }
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader closeButton>
          <ModalTitle id="contained-modal-title-vcenter">
            Add Product
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form>
            <h4>Upload Image</h4>
            {/* Add a modal element to render images from local storage */}
            <ImageUploadMUI
              label={"Add product"}
              succeedCallback={settingResizeImage}
            />
            <h4>Product name</h4>
            <input placeholder="name" name="name" onChange={onInfoChange} />
            <h4>Product description</h4>
            <textarea
              name="description"
              placeholder="add product details"
              size="3"
              onChange={onInfoChange}
            />
            <h4>Product Price</h4>
            <input onChange={onInfoChange} name="price"></input>
            <h4>Stock</h4>
            <input onChange={onInfoChange} name="stock"></input>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={sendToParentComponent}>Add</Button>
          <Button onClick={props.onHide}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default connect(null, { addProduct })(MyVerticallyCenteredModal);
