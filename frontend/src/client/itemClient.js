import axios from 'axios';

const api = () => {
    return {url: 'http://localhost:3005'};
}

const itemApi = api();

const createItemRequest = (item) => {
    return axios.post(itemApi.url + '/api/item', item);
}

const deleteItem = (id) => {
    return axios.delete(itemApi.url + '/api/item/' + id);
}

const getItemsRequest = () => {
    return axios.get(itemApi.url + '/api/item');
}

export {createItemRequest, getItemsRequest, deleteItem, itemApi}