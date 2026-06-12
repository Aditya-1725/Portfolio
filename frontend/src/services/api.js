import axios from "axios";

const API = axios.create({
  baseURL: "https://portfolio-backend-g407.onrender.com/api",
});

export default API;