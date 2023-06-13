import { makeRequest } from '../makeRequest';

type SendBookingRequestResponseProps = {
	appointmentId: number;
	response: string;
};

export async function SendBookingRequestResponse({
	appointmentId,
	response,
}: SendBookingRequestResponseProps) {
	return await makeRequest('/AdminPages/frontPage/bookingResponse', {
		method: 'POST',
		data: { appointmentId, response },
	});
}
