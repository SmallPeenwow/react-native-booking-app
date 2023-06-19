import { getDatesBooked } from '../../../services/UserPages/FrontPage/getDatesBooked';
import { DataObject } from '../../../shared/types/dateObject.type';

type useFetchBookedDatesProps = {
	currentBookedDates: (action: string[]) => void;
};

export const useFetchBookedDates = async ({
	currentBookedDates,
}: useFetchBookedDatesProps) => {
	await getDatesBooked().then((data) => {
		currentBookedDates(data.map((object: DataObject) => object.date));
	});
};
