import * as Constants from './constants';
import axios from 'axios';


axios.interceptors.request.use(function (config) {
    if (Constants.GUEST_USER_ENDPOINTS.indexOf(config.url) === -1) {
        config.headers.Authorization = localStorage['bearer_access_token'];
    }
    return config;
}, null);

async function updateToken(refresh) {
    return axios({
        method: "post",
        url: Constants.API_REFRESH,
        data: { refresh: refresh }
    }).then(res => res.data.access);
}

axios.interceptors.response.use(null, async function (error) {
    if (error.config.url === Constants.API_LOGIN) {
        return Promise.reject(error);
    }
    if (error.config.url.endsWith('auth/refreshToken/')) {
        localStorage.clear();
        return window.location.href = '/';
    }
    if (error.response.status === 401) {
        const new_token = await updateToken(localStorage['refresh_token']);
        localStorage['simple_access_token'] = new_token;
        localStorage['bearer_access_token'] = 'Bearer ' + new_token;
        error.config.headers.Authorization = localStorage['bearer_access_token'];
        return axios.request(error.config);
        
    }
    return Promise.reject(error);
});
