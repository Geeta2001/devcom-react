import axios from "axios";

  const url = 'http://localhost:8085/admin'
    const getAll = () => {
        return axios.get(`${url}/alldetails`);
      };
    
    const get = devId => {
      return axios.get(`${url}/getdetails/${devId}`)
    }

export default {getAll, get};
