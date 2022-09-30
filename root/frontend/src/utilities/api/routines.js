import axios from 'axios';
const SERVER_BASE_URL = "http://localhost:4000"
const JSON_SERVER_BASE_URL = "http://localhost:3500"

export default axios.create({
  baseURL: SERVER_BASE_URL
})