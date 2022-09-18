import axios from "axios";

  const url = 'http://localhost:8085/admin'
    const getAll = () => {
        return axios.get(`${url}/alldetails`);
      };
    
    const get = devId => {
      return axios.get(`${url}/getdetails/${devId}`)
    }

    const blockUser = userId => {
      return axios.put(`${url}/blockuser/${userId}`)
    }

    const unblockUser = userId => {
      return axios.put(`${url}/unblockuser/${userId}`)
    }

    const deleteResponse = respId => {
      return axios.delete(`${url}/deleteresponse/${respId}`)
    }

    const deleteFeed = feedId => {
      return axios.delete(`${url}/deletefeed/${feedId}`)
    }

    const getAllUsers = () => {
      return axios.get(`${url}/allusers`)
    }

    const removeResponse = respId => {
      return axios.delete(`${url}/deleteresponse/${respId}`)
    }


export default {getAll, get, blockUser, unblockUser, deleteResponse, deleteFeed, getAllUsers, removeResponse};
