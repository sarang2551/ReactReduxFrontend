import Axios from "axios";
export async function getProducts(username) {
  console.log(username);
  let response = await Axios.post("http://localhost:4000/getProducts", {
    username: username
  });
  //returning an array of objects
  return response.data;
}
export async function verifyUser(userInfo) {
  return await Axios.post("http://localhost:4000/login", userInfo);
}
export async function registerUser(userInfo) {
  return await Axios.post("http://localhost:4000/login", userInfo);
}
export async function apiAddProduct(productData) {
  return await Axios.post("http://localhost:4000/addProduct", productData);
}
export async function apiEditProductInfo(productData) {
  return await Axios.post("http://localhost:4000/editProduct", productData);
}
