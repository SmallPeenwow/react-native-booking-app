import moment from 'moment';

type useCompareDateBookingStatusProps = {
	datesBooked: string[];
	dateTime: string;
};

export const useCompareDateBookingStatus = ({
	datesBooked,
	dateTime,
}: useCompareDateBookingStatusProps) => {
	const isClosed = datesBooked.some((date) =>
		moment.utc(date).isSame(moment.utc(dateTime))
	);

	return { status: isClosed ? 'Not Available' : 'Available' };
};
