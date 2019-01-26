import {get, post} from '../Base';
const getLists = (page =1) =>{
     return get('/api/template?page='+page);
}


const create   = (data)  => {
     return post('/api/template/create', data);
}

export {getLists, create}