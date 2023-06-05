import { makeRequest } from '../../makeRequest';

export async function fetchBookingTimes(
	userId: number,
	appointmentStatus: string
) {
	return await makeRequest('/UserPages/userBookingTimes/', {
		method: 'POST',
		data: { userId, appointmentStatus },
	});
}
