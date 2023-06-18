import { fetchAcceptedBookings } from '../../../services/AcceptedBookings/fetchAcceptedBookings';
import { AcceptedBookingsTypes } from '../../../shared/types/acceptedBookings.type';

type useFetchAcceptedBookings = {
	setAcceptedBookings: (action: AcceptedBookingsTypes[]) => void;
};

export const useFetchAcceptedBookings = async ({
	setAcceptedBookings,
}: useFetchAcceptedBookings) => {
	await fetchAcceptedBookings().then((data) => {
		setAcceptedBookings(data);
	});
};
