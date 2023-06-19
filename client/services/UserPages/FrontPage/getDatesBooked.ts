import { makeRequest } from '../../makeRequest';

export async function getDatesBooked() {
	return await makeRequest('/UserPages/userFrontPage/fetchBookings', {
		method: 'GET',
	});
}
