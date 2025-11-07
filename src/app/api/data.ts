import axios from "axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
export const getUser = async (id: number) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  }
};
