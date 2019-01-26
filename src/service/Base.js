import axios from 'axios';
import {widowSuccess, windowError} from '../components/Message';
import { apiBaseUrl } from '../config/env';



function checkErrorCode()
{
    windowError('系统错误');
}


function checkStatus(response)
{
     if(response.data.status) {
         return response.data.data;
     }
     
     windowError(response.data.message);
}


const get = (url, data, errorCallback)=>{

        return axios({
            data: data,
            method: 'get',
            timeout: 10000,
            url: apiBaseUrl+url,
        })
        .then((response) => {
            return checkStatus(response)
        })
        .catch((error) => {
            return checkErrorCode(error, errorCallback)
        })
}

const post = (url, data, errorCallback) =>{
    return axios({
        data: data,
        method: 'post',
        timeout: 10000,
        url: apiBaseUrl+url,
    })
    .then((response) => {
        return checkStatus(response)
    })
    .catch((error) => {
        return checkErrorCode(error, errorCallback)
    })
}

export {get, post};