type useGiveAcceptedBookingsStatusProps = {
	dateCompare: Date;
};

export const useGiveAcceptedBookingsStatus = ({
	dateCompare,
}: useGiveAcceptedBookingsStatusProps) => {
	let dateNow = new Date();

	const timezoneOffsetInMinutes = dateNow.getTimezoneOffset();
	dateNow.setMinutes(dateNow.getMinutes() - timezoneOffsetInMinutes);

	if (
		dateCompare.getHours() === dateNow.getHours() &&
		dateCompare.getDate() === dateNow.getDate() &&
		dateCompare.getMonth() === dateNow.getMonth()
	) {
		console.log('yes');
		return { status: 'In Progress...' };
	} else if (dateCompare > dateNow) {
		return { status: 'Waiting...' };
	}

	return { status: 'Completed' };
};
