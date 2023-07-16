import axios from 'axios';

const token = sessionStorage.getItem('yt-access-token');
const Api_Request = axios.create({
    baseURL:'https://youtube.googleapis.com/youtube/v3',
    params:{
        key:process.env.REACT_APP_YT_API_KEY
    }
});

// Api_Request.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default Api_Request;

