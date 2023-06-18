import { useCallback, useMemo } from 'react';
import { FetchBookingTimes } from '../../../services/UserPages/BookingTimes/fetchBookingTimes';
import { useAsyncStorageRetrieve } from '../../LocalStorage/useAsyncStorageRetrieve';
import { UserStorage } from '../../../shared/interfaces/userStorage.interface';
import { UserBookingTimeInterface } from '../../../shared/interfaces/userBookingTimes.interface';
import { useSortFetchedData } from './useSortFetchedData';

type useFetchUserBookingTimeProps = {
	appointmentStatus: string;
	selectedDropdownValue: string;
	setIsLoading: (action: boolean) => void;
	setBookings: (action: UserBookingTimeInterface[]) => void;
};

export const useFetchUserBookingTime = ({
	appointmentStatus,
	selectedDropdownValue,
	setIsLoading,
	setBookings,
}: useFetchUserBookingTimeProps) => {
	// ISSUE MAYBE: runs twice
	let bookingArray: UserBookingTimeInterface[] = [];

	useMemo(async () => {
		setIsLoading(true);
		const jsonString: string | null = await useAsyncStorageRetrieve(
			'Justin-Bowden-booking-application-id'
		);

		if (jsonString !== null) {
			let userId: UserStorage = JSON.parse(jsonString);

			bookingArray = await FetchBookingTimes({
				userId: parseInt(userId.id),
				appointmentStatus: appointmentStatus,
			}).then((data) => {
				return data;
			});

			if (selectedDropdownValue === 'All') {
				const { sortedDate } = await useSortFetchedData({
					fetchedData: bookingArray,
				});

				setBookings(sortedDate);
				setIsLoading(false);
				return;
			}

			setBookings(bookingArray);
			setIsLoading(false);
		}
	}, [selectedDropdownValue]);
};
