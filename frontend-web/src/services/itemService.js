import axios from "axios";

const API_URL = "http://localhost:6002/api/item";

class itemService {
  // Create
  createItem(payload) {
    return axios.post(API_URL + "", payload).then((response) => {
      return response.data;
    });
  }

  // Read
  getItemsByUserId = (userId) => {
    return axios.get(API_URL + "/all?userId=" + userId).then((res) => {
      return res.data;
    });
  };

  // Update
  updateItem(itemId, payload) {
    return axios
      .put(API_URL + "?itemId=" + itemId, payload)
      .then((response) => {
        return response.data;
      });
  }

  // Delete
  deleteItem(itemId) {
    return axios.delete(API_URL + "?itemId=" + itemId).then((response) => {
      return response.data;
    });
  }
}

export default new itemService();
