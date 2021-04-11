import Axios from "axios";
export async function getProducts() {
  let response = await Axios.get("http://localhost:4000/getProducts");
  //returning an array of objects
  return response.data;
}
export async function verifyUser(userInfo) {
  return await Axios.post("http://localhost:4000/login", userInfo);
}
export async function registerUser(userInfo) {
  return await Axios.post("http://localhost:4000/login", userInfo);
}
