import { socket } from '../../../app/index';
import { SocketBookingActionResponseType } from '../../../shared/types/socketBookingActionResponse.type';

type useBookingActionProps = {
	date: string;
};

export const useBookingAction = ({ date }: useBookingActionProps) => {
	const SocketBookingActionResponse = ({
		responseMessage,
	}: SocketBookingActionResponseType) => {
		socket.emit('booking-action', responseMessage, date);
	};

	return { SocketBookingActionResponse };
};
