import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-my-burger-d426c.firebaseio.com"
});

export default instance;
