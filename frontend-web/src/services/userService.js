import axios from "axios";

const API_URL = "http://localhost:6001/api/user";

class userService {
  register(payload) {
    console.log("PAYLOAD", payload);
    return axios.post(API_URL + "/register", payload).then((response) => {
      console.log("RESPONSE", response.data);
      return response.data;
    });
  }
}

export default new userService();
