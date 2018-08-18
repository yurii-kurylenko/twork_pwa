import axios from 'axios';

export default function setup(store) {
    axios.interceptors.request.use(function(config) {
        const token = store.state.auth.token;
        if (token) {
            config.headers.Authorization = `JWT ${token}`;
        }
        return config;
    }, function(err) {
        if (err.response.status === 401) {
            store.dispatch('auth/logout');
        }
        return Promise.reject(err);
    });
}