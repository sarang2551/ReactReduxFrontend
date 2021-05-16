import React from "react";
import ProductCard from "./reusables/ProductCard";
import CardDeck from "react-bootstrap/CardDeck";
import { apiAddProduct, getProducts } from "./Api";
import { connect } from "react-redux";
import {
  updateProductList,
  addProduct,
  displayMessage
} from "../reduxOld/actions";
import Button from "react-bootstrap/Button";
import Headers from "./Header";
import Popup from "./reusables/pop-up";
import { TextField } from "@material-ui/core";
class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpOpen: false,
      editPopUpOpen: false,
      sessionData: JSON.parse(window.localStorage.getItem("session"))
    };
  }

  componentDidMount() {
    getProducts(this.state.sessionData.username)
      .then((data) => {
        if (!data.error) {
          this.props.updateProductList(data);
        }
        this.props.displayMessage({
          message: data.error,
          type: "error",
          show: true
        });
      })
      .catch((e) => {
        throw e;
      });
  }
  togglePopUp = () => {
    this.setState({ popUpOpen: !this.state.popUpOpen });
  };
  toggleEditPopUp = () => {
    this.setState({ editPopUpOpen: !this.state.popUpOpen });
  };
  handleProductAddition = async (formData) => {
    formData = { ...formData, username: this.state.sessionData.username };
    //API call
    const resposne = await apiAddProduct(formData);
    if (!resposne.data) {
      this.props.displayMessage({
        message: "Server side error while adding product!",
        type: "error",
        show: true
      });
      return;
    }
    //redux action
    this.props.addProduct(formData);
    this.props.displayMessage({
      message: "Successfully added the product!",
      type: "success",
      show: true
    });
  };
  handleProductEdit = (formData) => {};
  render() {
    return (
      <>
        <div>
          <Headers />
          <div
            style={{
              marginLeft: "250px",
              marginBottom: "20px",
              width: "200px"
            }}
          >
            <TextField
              multiline
              id="standard-basic"
              label="Search"
              variant="standard"
            />
          </div>
          <CardDeck style={{ marginLeft: "30%" }}>
            {this.props.productList.length >= 0
              ? this.props.productList.map((product, index) => {
                  return (
                    <div key={index}>
                      <ProductCard
                        data={product}
                        editOnClickEvent={this.toggleEditPopUp}
                      />
                    </div>
                  );
                })
              : null}
          </CardDeck>
          <Button
            style={{ marginLeft: "43%", marginTop: "10px" }}
            variant="danger"
            onClick={this.togglePopUp}
          >
            Add a product
          </Button>
          {this.state.popUpOpen ? (
            <Popup
              action={this.handleProductAddition}
              show={this.state.popUpOpen}
              onHide={this.togglePopUp}
            />
          ) : null}
          {this.state.editPopUpOpen ? (
            <Popup
              action={this.handleProductEdit}
              show={this.state.editPopUpOpen}
              onHide={this.toggleEditPopUp}
            />
          ) : null}
        </div>
      </>
    );
  }
}
export default connect(
  (state) => {
    return {
      productList: state.reducer.productList
    };
  },
  { updateProductList, addProduct, displayMessage }
)(ProductPage);
