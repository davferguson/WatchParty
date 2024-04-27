import axios from "axios";
const config = {
    url: '/search',
    method: 'get',
    baseURL: 'https://www.googleapis.com/youtube/v3',
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        key: process.env.REACT_APP_API_KEY,
        part: 'snippet',
        maxResults: 2,
        q: 'temp',
        type: 'video',
    }
};

export default {
    searchVideo(search) {
        config.params.q = search;
        return axios(config);
    }
}