import axios from "axios";

export const getUsersById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:9000/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id,data) => {
  try {
    const response = await axios.put(`http://localhost:9000/users/${id}`,data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

