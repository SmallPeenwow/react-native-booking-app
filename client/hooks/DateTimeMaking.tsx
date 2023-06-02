type DateTimeMakingProps = {
	dateTime: string;
};

export const DateTimeMaking = ({ dateTime }: DateTimeMakingProps) => {
	let dateTimeSeparated = dateTime.split('T');

	let day: string =
		new Date(dateTimeSeparated[0]).getDate() +
		' ' +
		new Date(dateTimeSeparated[0])
			.toLocaleString('en-us', {
				weekday: 'long',
			})
			.split(',')[0] +
		' ' +
		new Date(dateTimeSeparated[0]).toLocaleString('en-us', { month: 'long' }) +
		' ' +
		new Date(dateTimeSeparated[0]).toLocaleString('en-us', { year: 'numeric' });

	let time =
		parseInt(dateTimeSeparated[1].split(':')[0]) > 11
			? dateTimeSeparated[1].split(':')[0] + ':00 PM'
			: dateTimeSeparated[1].split(':')[0] + ':00 AM';

	return { time, day };
};
