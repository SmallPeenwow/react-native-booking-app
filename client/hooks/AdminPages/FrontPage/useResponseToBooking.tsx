import { SendBookingRequestResponse } from '../../../services/FrontPage/sendBookingRequestResponse';

type useResponseToBookingProps = {
	appointmentId: number;
	response: string;
};

export const useResponseToBooking = async ({
	appointmentId,
	response,
}: useResponseToBookingProps) => {
	return await SendBookingRequestResponse({
		appointmentId: appointmentId,
		response: response,
	});
};
