import { sendBookingRequestResponse } from '../../../services/FrontPage/sendBookingRequestResponse';

type ResponseToBooking = {
	appointmentId: number;
	response: string;
};

export const ResponseToBooking = async ({
	appointmentId,
	response,
}: ResponseToBooking) => {
	return await sendBookingRequestResponse(appointmentId, response);
};
