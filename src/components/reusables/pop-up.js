import React from "react";
import { addProduct } from "../../redux/reducers";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import { useDispatch } from "react-redux";
function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
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
            Modal heading
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={dispatch(addProduct())}>Add</Button>
          <Button onClick={props.onHide}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default connect(null, { addProduct })(MyVerticallyCenteredModal);
