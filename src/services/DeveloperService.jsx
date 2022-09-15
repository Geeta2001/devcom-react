import axios from "axios";

const url = 'http://localhost:8085/developers';

const getAllFeeds = () => {
    return axios.get(`${url}/allfeeds`);  
}

const create = data => {
    return axios.post(`${url}/addfeed`, data);
}

const addDetails = data => {
    return axios.post(`${url}/adddetails`, data);
}

const getDevById = devId => {
    return axios.get(`${url}/getdetails/${devId}`);
}

const updateDetails = (devId, data) => {
    return axios.put(`${url}/editdetails/${devId}`, data);
}

const addResponse = data => {
    return axios.post(`${url}/addresponse`,data)
}

export default {getAllFeeds, create, addDetails, getDevById, updateDetails, addResponse};