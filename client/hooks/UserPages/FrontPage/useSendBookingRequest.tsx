import moment from 'moment';
import { SendUsingBookingRequest } from '../../../services/UserPages/FrontPage/sendUsingBookingRequest';

type useSendBookingRequestProps = {
	userId: string;
	address: string | null;
	visitType: string;
	selectedBooking: string;
	currentBookedDates: string[];
	setIsError: (action: boolean) => void;
	setIsSuccess: (action: boolean) => void;
	setErrorMessage: (action: string) => void;
	setCurrentBookedDates: (action: string[]) => void;
};

export const useSendBookingRequest = async ({
	userId,
	address,
	visitType,
	selectedBooking,
	currentBookedDates,
	setIsError,
	setIsSuccess,
	setErrorMessage,
	setCurrentBookedDates,
}: useSendBookingRequestProps) => {
	const DATE_ALREADY_BOOKED = 'Already Booked';
	const DATE_BOOKED_SUCCESSFUL = 'Successful';

	const SendBookingRequest = async () => {
		try {
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

				return;
			} else if (response === DATE_BOOKED_SUCCESSFUL) {
				setIsSuccess(true);

				setCurrentBookedDates([
					...currentBookedDates,
					moment.utc(selectedBooking).local().toDate().toISOString(),
				]);
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
