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
	let weeksInMonth: string[] = [];

	// Check if it is the current month and year
	const isCurrentMonthAndYear =
		new Date().getMonth() === monthNumber &&
		new Date().getFullYear() === parseInt(year);

	//Make A thing to only get from current day onwards
	let dates = new Date(parseInt(year), monthNumber, 1);

	while (dates.getMonth() === monthNumber) {
		if (isCurrentMonthAndYear && dates.getDate() < new Date().getDate()) {
			dates.setDate(dates.getDate() + 1);
			continue;
		}

		if (![0, 6].includes(dates.getDay())) {
			weeksInMonth.push(
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
	}

	return { weeksInMonth };
};
