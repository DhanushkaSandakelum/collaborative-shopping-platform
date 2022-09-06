import axios from "axios";

const API_URL = "http://localhost:7003/api/payment";

class itemService {
  // Create payment
  createPayment(payload) {
    return axios.post(API_URL + "", payload).then((response) => {
      return response.data;
    });
  }

  // Read
  getPayments = () => {
    return axios.get(API_URL + "/all").then((res) => {
      return res.data;
    });
  };
}

export default new itemService();
