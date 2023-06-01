import { makeRequest } from '../makeRequest';

export async function fetchPendingRequests() {
	return await makeRequest('/AdminPages/frontPage', {
		method: 'GET',
	});
}
