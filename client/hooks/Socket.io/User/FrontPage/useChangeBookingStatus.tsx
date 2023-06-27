type useChangeBookingStatusProps = {
	date: string;
	statusResponse: string;
	currentBookedDates: string[];
	setCurrentBookedDates: (action: string[]) => void;
};

export const useChangeBookingStatus = ({
	date,
	statusResponse,
	currentBookedDates,
	setCurrentBookedDates,
}: useChangeBookingStatusProps) => {
	if (currentBookedDates.includes(date) && statusResponse === 'accept') return;

	if (statusResponse === 'decline') {
		setCurrentBookedDates(
			currentBookedDates.filter((bookedDate) => bookedDate !== date)
		);
		return;
	}

	if (!currentBookedDates.includes(date)) {
		setCurrentBookedDates([...currentBookedDates, date]);

		return;
	}
};
