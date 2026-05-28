import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.jikan.moe/v4', 
  timeout: 10000,
});

export default apiClient;