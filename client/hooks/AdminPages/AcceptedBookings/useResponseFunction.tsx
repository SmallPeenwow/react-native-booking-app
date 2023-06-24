import { SocketBookingActionResponseType } from '../../../shared/types/socketBookingActionResponse.type';
import { useBookingResponse } from '../FrontPage/useBookingResponse';

type useResponseFunctionProps = {
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

export const useResponseFunction = ({
	appointmentId,
	response,
	setIsLoading,
	setIsError,
	setIsSuccess,
	setResponseMessage,
	setErrorMessage,
	RemoveDiv,
	SocketBookingActionResponse,
}: useResponseFunctionProps) => {
	const { BookingResponse } = useBookingResponse({
		appointmentId: appointmentId,
		response: response,
		setIsLoading: setIsLoading,
		setIsSuccess: setIsSuccess,
		setIsError: setIsError,
		setResponseMessage: setResponseMessage,
		setErrorMessage: setErrorMessage,
		RemoveDiv: RemoveDiv,
		SocketBookingActionResponse: SocketBookingActionResponse,
	});

	BookingResponse();
};
