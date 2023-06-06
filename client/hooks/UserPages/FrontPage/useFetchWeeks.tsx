type useFetchWeeks = {
	month: string;
	monthArrayNames: string[];
	year: string;
};

export const useFetchWeeks = ({
	month,
	monthArrayNames,
	year,
}: useFetchWeeks) => {
	let monthNumber = monthArrayNames.indexOf(month);
	let weeks: string[][] = [];

	// Something wrong with time and day on this
	let dates = new Date(parseInt(year), monthNumber, 1);

	let currentWeek: string[] = [];

	while (dates.getMonth() === monthNumber) {
		if (![0, 6].includes(dates.getDay())) {
			currentWeek.push(
				dates.getDate() +
					' ' +
					dates
						.toLocaleString('en-US', {
							weekday: 'long',
						})
						.split(',')[0]
			);
		}

		// Moves to next day
		dates.setDate(dates.getDate() + 1);

		// Checks to see if end of the week Saturday
		if (dates.getDay() === 6) {
			if (currentWeek.length > 0) {
				weeks.push(currentWeek);
			}
			currentWeek = [];
		}
	}

	return { weeks };
};
