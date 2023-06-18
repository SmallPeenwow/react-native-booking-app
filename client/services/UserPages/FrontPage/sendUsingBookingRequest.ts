import { makeRequest } from '../../makeRequest';

type sendUsingBookingRequestProps = {
	userId: number;
	address: string | null;
	locationType: string;
	date: Date;
};

export async function sendUsingBookingRequest({
	userId,
	address,
	locationType,
	date,
}: sendUsingBookingRequestProps) {
	return await makeRequest('/UserPages/userFrontPage/', {
		method: 'POST',
		data: { userId, address, locationType, date },
	});
}
