import { makeRequest } from '../../makeRequest';

type FetchBookingTimesProps = {
	userId: number;
	appointmentStatus: string;
};

export async function FetchBookingTimes({
	userId,
	appointmentStatus,
}: FetchBookingTimesProps) {
	return await makeRequest('/UserPages/userBookingTimes/', {
		method: 'POST',
		data: { userId, appointmentStatus },
	});
}
