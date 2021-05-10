import Alert from "react-bootstrap/Alert";
import React from "react";
import { connect } from "react-redux";
import { displayMessage } from "../../reduxOld/actions";
function GlobalSharedComponentsMui(props) {
  const globalLoader = () => {
    if (!props.show) {
      return null;
    }

    // auto dismiss after 4s
    setTimeout(() => {
      props.displayMessage({ show: false });
    }, 4000);
  };

  const globalMessageAlert = () => {
    let messageVariant;
    switch (props.type) {
      case "warn":
        messageVariant = "warning";
        break;
      case "error":
        messageVariant = "danger";
        break;
      case "failed":
        messageVariant = "danger";
        break;
      default:
        messageVariant = "info";
    }
    return props.message ? (
      <Alert
        show={props.show}
        dismissible
        transition
        variant={messageVariant}
        onClose={() => {
          props.displayMessage({ message: "", type: "", show: false });
        }}
      >
        {props.message}
      </Alert>
    ) : null;
  };

  return (
    <>
      {globalMessageAlert()}
      {globalLoader()}
    </>
  );
}

export default connect(
  (state) => {
    return { ...state.reducer.messageObj };
  },
  { displayMessage }
)(GlobalSharedComponentsMui);
