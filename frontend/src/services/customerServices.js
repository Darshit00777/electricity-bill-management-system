import axios from "axios";

const API = "http://localhost:5000/api/customer";

export const getCustomers = async() => {
    const result = await axios.get(`${API}/getall`);
    return result.data;
};

export const getBillByAll = async() => {
    const result = await axios.get(`${API}/getBillByAll`);
    return result.data;
};

export const getSummary = async() => {
    const result = await axios.get(`${API}/getSummary`);
    return result.data;
};