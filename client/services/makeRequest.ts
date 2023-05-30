import axios from 'axios';
import { API_URL } from '@env';

// NOTE .env has API_URL for test user your local URL string: http://192.168.1.51:3001
const api = axios.create({
	// baseURL: 'http://localhost:3001',
	// baseURL: 'http://127.0.0.1:3001',
	// baseURL: API_URL,
	baseURL: 'http://192.168.1.51:3001',
	// baseURL: 'http://10.0.2.2:3001',
	withCredentials: true,
});

export async function makeRequest(url: string, options: any) {
	return await api(url, options)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			Promise.reject(error?.response?.data ?? 'Error');
		});
}
