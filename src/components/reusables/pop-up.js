import React from "react";
import { addProduct } from "../../reduxOld/actions";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
function MyVerticallyCenteredModal(props) {
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
            <h1>Product description</h1>
            <textarea placeholder="add product details" size="4" />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.handleAddProduct}>Add</Button>
          <Button onClick={props.onHide}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default connect(null, { addProduct })(MyVerticallyCenteredModal);
