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
import { MDBInput } from "mdbreact";
function MyVerticallyCenteredModal(props) {
  const marginStyling = { marginLeft: "300px" };
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
        animation={true}
        centered={true}
      >
        <ModalHeader closeButton>
          <ModalTitle id="contained-modal-title-vcenter">
            Add Product
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form>
            <h4 style={marginStyling}>Upload Image</h4>
            <ImageUploadMUI
              label={"Add product"}
              succeedCallback={settingResizeImage}
              marginLeft={marginStyling.marginLeft}
              marginBottom={"0"}
              marginTop={"0"}
            />
            <h4 style={marginStyling}>Product name</h4>
            <MDBInput
              style={{ width: "150px", marginLeft: "300px" }}
              name="name"
              onChange={onInfoChange}
            />

            <h4 style={marginStyling}>Product description</h4>
            <textarea
              style={marginStyling}
              name="description"
              placeholder="add product details"
              size="3"
              onChange={onInfoChange}
            />
            <h4 style={marginStyling}>Product Price</h4>
            <input
              style={marginStyling}
              onChange={onInfoChange}
              name="price"
            ></input>
            <h4 style={marginStyling}>Stock</h4>
            <input
              style={marginStyling}
              onChange={onInfoChange}
              name="stock"
            ></input>
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
