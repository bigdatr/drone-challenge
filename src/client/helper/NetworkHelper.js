import axios from './NetworkInterceptor';
import {merge} from 'lodash';


class NetworkHelper {

    makeRequest(_options) {
        const method = _options.method || 'GET';
        const options = merge(
            {..._options},
            {
                method
            }
        );

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
    post(url, param) {
        console.log(param);
        const options = {
            method: 'POST',
            url: url,
            data: param
        };
        return this.makeRequest(options);
    }
}

export default new NetworkHelper();
