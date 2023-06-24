import { UserBookingTimeInterface } from '../../../../shared/interfaces/userBookingTimes.interface';

type useBookingResponseChangeProps = {
	statusResponse: string;
	date: string;
	bookings: UserBookingTimeInterface[];
	setBookings: (action: UserBookingTimeInterface[]) => void;
};

export const useBookingResponseChange = ({
	statusResponse,
	date,
	bookings,
	setBookings,
}: useBookingResponseChangeProps) => {
	const modifiedData: UserBookingTimeInterface | undefined = bookings.find(
		(item: UserBookingTimeInterface) =>
			item.date === date && item.appointment_status === 'pending'
	);

	if (modifiedData !== undefined) {
		const updatedBooking: UserBookingTimeInterface = {
			appointment_status: statusResponse,
			date: date,
			location_type: modifiedData.location_type,
		};
		const index = bookings.indexOf(modifiedData);
		bookings[index] = updatedBooking;

		setBookings(bookings);
	}
};
