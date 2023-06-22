import { SocketBookingActionResponseType } from '../../../shared/types/socketBookingActionResponse.type';
import { useResponseToBooking } from './useResponseToBooking';

type useBookingResponseProps = {
	appointmentId: number;
	response: string;
	setIsLoading: (action: boolean) => void;
	setIsSuccess: (action: boolean) => void;
	setIsError: (action: boolean) => void;
	setResponseMessage: (action: string) => void;
	setErrorMessage: (action: string) => void;
	RemoveDiv: () => void;
	SocketBookingActionResponse: ({
		responseMessage,
	}: SocketBookingActionResponseType) => void;
};

export const useBookingResponse = ({
	appointmentId,
	response,
	setIsLoading,
	setIsSuccess,
	setIsError,
	setResponseMessage,
	setErrorMessage,
	RemoveDiv,
	SocketBookingActionResponse,
}: useBookingResponseProps) => {
	const BookingResponse = async () => {
		try {
			setIsLoading(true);

			let responseMessage = await useResponseToBooking({
				appointmentId: appointmentId,
				response: response,
			});

			SocketBookingActionResponse({ responseMessage: response });
			RemoveDiv();
			setResponseMessage(responseMessage);
			setIsLoading(false);
			setIsSuccess(true);
		} catch (error) {
			setIsLoading(false);
			setErrorMessage('Failed to process. Please try again.');
			setIsError(true);
		}
	};

	return { BookingResponse };
};
