import React from "react";
import ProductCard from "./reusables/ProductCard";
import CardDeck from "react-bootstrap/CardDeck";
import { apiAddProduct, getProducts, apiEditProductInfo } from "./Api";
import { connect } from "react-redux";
import {
  updateProductList,
  addProduct,
  editProduct,
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
      addPopUpOpen: false,
      editPopUpOpen: false,
      selectedProductIndex: -1,
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
    this.setState({ addPopUpOpen: !this.state.addPopUpOpen });
  };
  toggleEditPopUp = () => {
    this.setState({ editPopUpOpen: !this.state.editPopUpOpen });
  };
  onProductSelect = (index) => {
    this.setState({ selectedProductIndex: index });
  };
  handleProductAddition = async (formData) => {
    formData = { ...formData, username: this.state.sessionData.username };
    //API call
    const resposne = await apiAddProduct(formData);
    if (!resposne) {
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
  handleProductEdit = async (formData) => {
    // Need to filter the data to remove any values that aren't modified
    for (var key in formData) {
      const value = formData[key];
      if (value === "" || value === undefined || value === null) {
        delete formData[key];
      }
    }
    const apiFormData = {
      ...formData,
      username: this.state.sessionData.username
    };
    const response = await apiEditProductInfo(apiFormData);
    if (!response) {
      this.props.displayMessage({
        message: "Server side error while editting product!",
        type: "error",
        show: true
      });
      return;
    }
    formData = { ...formData, index: this.state.selectedProductIndex };

    // redux action
    this.props.editProduct(formData);
    this.props.displayMessage({
      message: "Successfully editted a product!",
      type: "success",
      show: true
    });
  };
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
                        data={{ ...product, index }}
                        editOnClickEvent={this.toggleEditPopUp}
                        onSelect={this.onProductSelect}
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
          {this.state.addPopUpOpen ? (
            <Popup
              action={this.handleProductAddition}
              show={this.state.addPopUpOpen}
              onHide={this.togglePopUp}
              addFeature={true}
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
  { updateProductList, addProduct, editProduct, displayMessage }
)(ProductPage);
