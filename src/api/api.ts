import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    headers: {
        'x-api-key': 'aabad94c-539d-4ac1-8248-7566eae05688',
    }
})