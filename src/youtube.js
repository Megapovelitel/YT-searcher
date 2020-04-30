import axios from 'axios';

const KEY = 'AIzaSyBybOnVEiObpB1QF_R-nY-6gM9J_KiU-9Q';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 12,
        key: KEY
    }
})