import axios from 'axios';
// Not even connecting to server side
const api = axios.create({
	// baseURL: 'http://localhost:3001',
	// baseURL: 'http://127.0.0.1:3001',
	baseURL: 'http://192.168.1.51:3001',
	// baseURL: 'http://10.0.2.2:3001',
	withCredentials: true,
});

export async function makeRequest(url: string) {
	console.log(url);
	// console.log(options);
	// return api(url, options)
	return api
		.get(url)
		.then((res) => {
			console.log(res.data);
			return res.data;
		})
		.catch((error) => {
			// console.log(error);
			// console.log(error.response);
			// console.log(error.message);
			// console.log(error.response.data);
			Promise.reject(error?.response?.data ?? 'Error');
		});
}
