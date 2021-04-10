import React from "react";
import ProductCard from "./reusables/ProductCard";
import CardDeck from "react-bootstrap/CardDeck";
import { getProducts } from "./Api";
import { connect, useSelector } from "react-redux";
import { updateProductList, selectProductList } from "../reduxOld/actions";
import Headers from "./Header";
function ProductPage() {
  const productList = useSelector(selectProductList);
  console.log(productList);
  return (
    <>
      <div>
        <Headers />
        <CardDeck>
          {productList.length >= 0
            ? productList.map((product, index) => {
                console.log(product);
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
export default connect(null, { updateProductList, selectProductList })(
  ProductPage
);
