import axios from 'axios';

// TODO: Change this to your backend URL.
export const API_BASE_URL = 'http://localhost:3000/api/v1';

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API request error:', error);
        throw error;
    }
);

export default apiService;
