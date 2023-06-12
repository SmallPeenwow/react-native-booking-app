import { sendBookingRequestResponse } from '../../../services/FrontPage/sendBookingRequestResponse';

type useResponseToBookingProps = {
	appointmentId: number;
	response: string;
};

export const useResponseToBooking = async ({
	appointmentId,
	response,
}: useResponseToBookingProps) => {
	return await sendBookingRequestResponse(appointmentId, response);
};
