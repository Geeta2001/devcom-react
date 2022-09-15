import axios from "axios";
const url = "http://localhost:8085/user"
const register = data => {
        return axios.post(`${url}/register`, data);
}

const login = data => {
        return axios.post(`${url}/login`, data);
}
export default {register, login};

