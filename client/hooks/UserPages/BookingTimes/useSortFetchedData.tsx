import { UserBookingTimeInterface } from '../../../shared/interfaces/userBookingTimes.interface';

type useSortFetchedDataProps = {
	fetchedData: UserBookingTimeInterface[];
};

export const useSortFetchedData = async ({
	fetchedData,
}: useSortFetchedDataProps) => {
	const statusOrder = ['accept', 'pending', 'decline'];

	const sortedDate = fetchedData.sort((first, second) => {
		const statusFirst = statusOrder.indexOf(first.appointment_status);
		const statusSecond = statusOrder.indexOf(second.appointment_status);

		if (statusFirst !== statusSecond) {
			return statusFirst - statusSecond;
		}

		const dateFirst = new Date(first.date);
		const dateSecond = new Date(second.date);

		return dateFirst.getTime() - dateSecond.getTime();
	});

	return { sortedDate };
};
