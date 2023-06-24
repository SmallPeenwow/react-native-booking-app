import { useSendBookingRequest } from './useSendBookingRequest';

type useAlertOkYesProps = {
	userId: string | null;
	visitType: string;
	address: string | null;
	selectedBooking: string;
	currentBookedDates: string[];
	setIsError: (action: boolean) => void;
	setIsSuccess: (action: boolean) => void;
	setIsLoading: (action: boolean) => void;
	setErrorMessage: (action: string) => void;
	setLoadingHeader: (action: string) => void;
	setCurrentBookedDates: (action: string[]) => void;
	OnPressClose: () => void;
};

export const useAlertOkYes = async ({
	userId,
	visitType,
	address,
	selectedBooking,
	currentBookedDates,
	setIsError,
	setIsSuccess,
	setIsLoading,
	setErrorMessage,
	setLoadingHeader,
	setCurrentBookedDates,
	OnPressClose,
}: useAlertOkYesProps) => {
	setLoadingHeader('Processing...');
	setIsLoading(true);
	if (userId == null) {
		setErrorMessage('Id does not exist. Process system failed.');
		setIsError(true);
		return;
	}

	const { SendBookingRequest } = await useSendBookingRequest({
		userId: userId,
		visitType: visitType,
		address: address,
		selectedBooking: selectedBooking,
		currentBookedDates: currentBookedDates,
		setIsError: setIsError,
		setIsSuccess: setIsSuccess,
		setErrorMessage: setErrorMessage,
		setCurrentBookedDates: setCurrentBookedDates,
	});

	await SendBookingRequest();

	setIsLoading(false);
	OnPressClose();
	setLoadingHeader('Loading...');
};
