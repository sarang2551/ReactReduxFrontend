import React from "react";
import ProductCard from "./reusables/ProductCard";
import CardDeck from "react-bootstrap/CardDeck";
import { getProducts } from "./Api";
import { connect } from "react-redux";
import { updateProductList, addProduct } from "../reduxOld/actions";
import Button from "react-bootstrap/Button";
import Headers from "./Header";
import Popup from "./reusables/pop-up";
class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { popUpOpen: false };
  }

  componentDidMount() {
    getProducts()
      .then((productList) => {
        this.props.updateProductList(productList);
      })
      .catch((e) => {
        throw e;
      });
  }
  togglePopUp = () => {
    this.setState({ popUpOpen: !this.state.popUpOpen });
    console.log(this.state.popUpOpen);
  };
  handleProductAddition = (e) => {
    e.preventDefault();
    //going to be a form data
    const value = e.target.product;
    //API call
    //redux action
    addProduct(e.target);
  };
  render() {
    return (
      <>
        <div>
          <Headers />
          <CardDeck style={{ marginLeft: "30%" }}>
            {this.props.productList.length >= 0
              ? this.props.productList.map((product, index) => {
                  return (
                    <div key={index}>
                      <ProductCard data={product} />
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
              show={this.state.popUpOpen}
              onHide={this.togglePopUp}
              handleAddProduct={this.handleProductAddition}
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
      ...state,
      productList: state.reducer.productList
    };
  },
  { updateProductList, addProduct }
)(ProductPage);
