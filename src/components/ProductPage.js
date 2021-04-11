import React from "react";
import ProductCard from "./reusables/ProductCard";
import CardDeck from "react-bootstrap/CardDeck";
import { getProducts } from "./Api";
import { connect, useSelector } from "react-redux";
import { updateProductList, selectProductList } from "../reduxOld/actions";
import Headers from "./Header";
export default class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productList: [] };
  }
  componentDidMount() {
    getProducts()
      .then((productList) => {
        this.setState({ productList });
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
          <CardDeck>
            {this.state.productList.length >= 0
              ? this.state.productList.map((product, index) => {
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
