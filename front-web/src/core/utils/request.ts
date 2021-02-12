import axios, {Method} from 'axios';

type RequestParams = {
    method?: Method;
    url: string;
    data?: Object;
    params?: Object;
}
const BASE_URL = 'http://localhost:3000'
const makeRequest = ({method = 'GET', url, data, params}:RequestParams) => {
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params
    });
}

export default makeRequest;