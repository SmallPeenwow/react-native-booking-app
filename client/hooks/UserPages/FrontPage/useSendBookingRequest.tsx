import moment from 'moment';
import { SendUsingBookingRequest } from '../../../services/UserPages/FrontPage/sendUsingBookingRequest';

type useSendBookingRequestProps = {
	userId: string;
	address: string | null;
	visitType: string;
	selectedBooking: string;
	setIsLoading: (action: boolean) => void;
	setIsError: (action: boolean) => void;
	setIsSuccess: (action: boolean) => void;
	setErrorMessage: (action: string) => void;
	OnPressClose: () => void;
};

export const useSendBookingRequest = async ({
	userId,
	address,
	visitType,
	selectedBooking,
	setIsLoading,
	setIsError,
	setIsSuccess,
	setErrorMessage,
	OnPressClose,
}: useSendBookingRequestProps) => {
	const DATE_ALREADY_BOOKED = 'Already Booked';
	const DATE_BOOKED_SUCCESSFUL = 'Successful';

	const SendBookingRequest = async () => {
		try {
			setIsLoading(true);

			let response = await SendUsingBookingRequest({
				userId: parseInt(userId),
				address: address,
				locationType: visitType,
				date: moment.utc(selectedBooking).local().toDate(),
			});

			if (response === DATE_ALREADY_BOOKED) {
				setErrorMessage(
					'Date is already booked. Please try a different date and time.'
				);
				setIsError(true);
				OnPressClose();
				return;
			} else if (response === DATE_BOOKED_SUCCESSFUL) {
				setIsSuccess(true);
				OnPressClose();
				return;
			}
		} catch (error) {
			setErrorMessage('Failed to process booking request. Please try again.');
			setIsError(true);
		}
		return;
	};

	return { SendBookingRequest };
};
