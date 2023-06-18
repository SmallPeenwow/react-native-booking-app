import { useResponseToBooking } from './useResponseToBooking';

type useBookingResponseProps = {
	appointmentId: number;
	response: string;
	setIsLoading: (action: boolean) => void;
	setIsSuccess: (action: boolean) => void;
	setResponseMessage: (action: string) => void;
	RemoveDiv: () => void;
};

export const useBookingResponse = ({
	appointmentId,
	response,
	setIsLoading,
	setIsSuccess,
	setResponseMessage,
	RemoveDiv,
}: useBookingResponseProps) => {
	const BookingResponse = async () => {
		setIsLoading(true);
		let responseMessage = await useResponseToBooking({
			appointmentId: appointmentId,
			response: response,
		});

		RemoveDiv();
		setResponseMessage(responseMessage);
		setIsLoading(false);
		setIsSuccess(true);
	};

	return { BookingResponse };
};
