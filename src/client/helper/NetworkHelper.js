import axios from './NetworkInterceptor';


class NetworkHelper {

    makeRequest(options) {
        return axios(options).then((response) => {
            return response;
        }).catch(error => {
            /**
             *  Log error here
             */
            console.log(error.toString());
        });
    }


    /**
     * Make get request
     * @param url
     * @param param
     * @returns {AxiosPromise}
     */
    get(url, param) {
        const options = {
            method: 'GET',
            url: url,
            params: param
        };
        return this.makeRequest(options);
    }

    /**
     * Make post request
     * @param url
     * @param param
     * @returns {AxiosPromise}
     */
    jsonPost(url, param) {
        const options = {
            method: 'POST',
            url: url,
            data: param
        };
        return this.makeRequest(options);
    }

    formPost(url, formData) {
        const options = {
            method: 'POST',
            url: url,
            config: {
                header: {'Content-Type': 'multipart/form-data'},
            },
            data: formData,
        };
        return this.makeRequest(options);
    }
}

export default new NetworkHelper();
