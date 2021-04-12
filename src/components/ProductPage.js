import React from "react";
import ProductCard from "./reusables/ProductCard";
import CardDeck from "react-bootstrap/CardDeck";
import { getProducts } from "./Api";
import { connect } from "react-redux";
import { updateProductList } from "../reduxOld/actions";
import Headers from "./Header";
class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productList: [] };
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
        </div>
      </>
    );
  }
}
export default connect(
  (state) => {
    return { productList: state.reducer.productList };
  },
  { updateProductList }
)(ProductPage);
