import { makeRequest } from '../makeRequest';

export async function fetchAcceptedBookings() {
	return await makeRequest('/AdminPages/acceptedBookings/', {
		method: 'GET',
	});
}
