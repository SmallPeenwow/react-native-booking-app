import { makeRequest } from '../../makeRequest';

type SendUsingBookingRequestProps = {
	userId: number;
	address: string | null;
	locationType: string;
	date: Date;
};

export async function SendUsingBookingRequest({
	userId,
	address,
	locationType,
	date,
}: SendUsingBookingRequestProps) {
	return await makeRequest('/UserPages/userFrontPage/', {
		method: 'POST',
		data: { userId, address, locationType, date },
	});
}
