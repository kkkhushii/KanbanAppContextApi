import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';

export const axiosServices = axios.create();
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

const mock = new AxiosMockAdapter(axios, { delayResponse: 0 });
export default mock;
