import axios from 'axios';
axios.interceptors.request.use(
    config => {
        /**
         * Add token here
         */
        return config;
    },
    err => {
        return Promise.reject(err)
    }
);

axios.interceptors.response.use(
    response => {
        /**
         * Add error code checking here
         */
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
