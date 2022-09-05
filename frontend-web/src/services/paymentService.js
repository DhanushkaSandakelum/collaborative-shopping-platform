import axios from "axios";

const API_URL = "http://localhost:7003/api/payment";

class itemService {
  // Create payment
  createPayment(payload) {
    return axios.post(API_URL + "", payload).then((response) => {
      return response.data;
    });
  }
}

export default new itemService();
