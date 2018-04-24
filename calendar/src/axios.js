import axios from "axios";

const myaxios = axios.create({
    baseURL: "https://nolaplanner-481f1.firebaseio.com/"
});

export default myaxios;
