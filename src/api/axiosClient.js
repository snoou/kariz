import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.jikan.moe/v4', 
  timeout: 30000,
});

export default apiClient;