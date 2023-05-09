import axios from 'axios';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const apiService = {
    commonPostCall,
    commonGetCall,
    commonGetMasters,
};
const hostURL = `${publicRuntimeConfig.apiUrl}`;
// const hostURL = process.env.NEXT_PUBLIC_API_HOST_URL;
const  commonPostCall = async (endPoint, data)   => {
    return await axios.post(hostURL + endPoint, data);
}

const commonGetCall= async (endPoint)=> {
    return await axios.get(hostURL + endPoint);
}
const commonGetMasters= async (endPoint) => {
    return await axios.get(hostURL + endPoint);
}


