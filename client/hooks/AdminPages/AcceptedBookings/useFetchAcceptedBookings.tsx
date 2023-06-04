import { useCallback, useMemo } from 'react';
import { fetchAcceptedBookings } from '../../../services/AcceptedBookings/fetchAcceptedBookings';
import { AcceptedBookingsTypes } from '../../../shared/types/acceptedBookings.type';

type useFetchAcceptedBookings = {
	setAcceptedBookings: (action: AcceptedBookingsTypes[]) => void;
};

// TODO: find another way besides useMemo to get the fetch to run once
export const useFetchAcceptedBookings = ({
	setAcceptedBookings,
}: useFetchAcceptedBookings) => {
	useMemo(
		async () =>
			await fetchAcceptedBookings().then((data) => {
				setAcceptedBookings(data);
			}),
		[setAcceptedBookings]
	);
};
