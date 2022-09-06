import axios from "axios";

const API_URL = "http://localhost:6003/api/delivery";

class itemService {
  // Read
  getDeliveries = () => {
    return axios.get(API_URL + "/all").then((res) => {
      return res.data;
    });
  };
}

export default new itemService();
