


import { message } from 'antd';

const windowSuccess = (msg:string) => {
     message.success(msg);
}

const windowError = (msg:string) => {
    message.error(msg);
}

export  {windowSuccess, windowError};