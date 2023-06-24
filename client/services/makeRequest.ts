import axios from 'axios';
import { API_URL } from '@env';

// NOTE .env has API_URL for test user your local URL string: http://192.168.1.51:3001
const api = axios.create({
	baseURL: API_URL,
	// baseURL: 'http://192.168.1.51:3001',
	withCredentials: true,
});

export async function makeRequest(url: string, options: object) {
	return await api(url, options)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			Promise.reject(error?.response?.data?.message ?? 'Error');
		});
}
