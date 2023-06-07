import { monthArrayNames } from '../../../shared/monthArrayNames';

type useCreateDateTimeToSendProps = {
	day: string;
	month: string;
	year: string;
	time: string;
};

export const useCreateDateTimeToSend = ({
	day,
	month,
	year,
	time,
}: useCreateDateTimeToSendProps) => {
	let monthNumber =
		monthArrayNames.indexOf(month) + 1 < 10
			? '0' + (monthArrayNames.indexOf(month) + 1)
			: monthArrayNames.indexOf(month) + 1;

	let dayNumber =
		parseInt(day.split(' ')[0]) < 10
			? '0' + day.split(' ')[0]
			: day.split(' ')[0];

	let date: string = year + '-' + monthNumber + '-' + dayNumber;

	let timeValue: string = time.split(' ')[0] + ':00';

	return { dateTime: date + ' ' + timeValue };
};
