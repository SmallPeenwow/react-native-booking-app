import axios from 'axios';

const api = axios.create({
	// baseURL: 'http://localhost:3001',
	// baseURL: 'http://127.0.0.1:3001',
	baseURL: 'http://192.168.1.51:3001',
	// baseURL: 'http://10.0.2.2:3001',
	withCredentials: true,
});

export async function makeRequest(url: string) {
	return api
		.get(url)
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			Promise.reject(error?.response?.data ?? 'Error');
		});
}
