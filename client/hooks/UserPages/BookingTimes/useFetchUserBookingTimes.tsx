import { useCallback, useMemo } from 'react';
import { fetchBookingTimes } from '../../../services/UserPages/BookingTimes/fetchBookingTimes';
import { useAsyncStorageRetrieve } from '../../LocalStorage/useAsyncStorageRetrieve';
import { UserStorage } from '../../../shared/interfaces/userStorage.interface';
import { UserBookingTimeInterface } from '../../../shared/interfaces/userBookingTimes.interface';

type useFetchUserBookingTimeProps = {
	appointmentStatus: string;
	selectedDropdownValue: string;
	setBookings: (action: UserBookingTimeInterface[]) => void;
};

export const useFetchUserBookingTime = ({
	appointmentStatus,
	selectedDropdownValue,
	setBookings,
}: useFetchUserBookingTimeProps) => {
	useMemo(async () => {
		const jsonString: string | null = await useAsyncStorageRetrieve(
			'Justin-Bowden-booking-application-id'
		);

		if (jsonString !== null) {
			let userId: UserStorage = JSON.parse(jsonString);

			await fetchBookingTimes(parseInt(userId.id), appointmentStatus).then(
				(data) => {
					setBookings(data);
				}
			);
		}
	}, [selectedDropdownValue]);
};
