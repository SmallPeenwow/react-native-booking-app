import { makeRequest } from '../makeRequest';

export async function sendBookingRequestResponse(
	appointmentId: number,
	response: string
) {
	return await makeRequest('/AdminPages/frontPage/bookingResponse', {
		method: 'POST',
		data: { appointmentId, response },
	});
}
