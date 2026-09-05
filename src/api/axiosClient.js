import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.tenrai.org/v1', 
  timeout: 30000,
});

export default apiClient;