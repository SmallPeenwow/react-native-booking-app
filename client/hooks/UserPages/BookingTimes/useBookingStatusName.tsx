type useBookingStatusName = {
	status: string;
};

export const useBookingStatusName = ({ status }: useBookingStatusName) => {
	const ACCEPT_STATUS = 'accept';
	const DECLINE_STATUS = 'decline';

	if (status === ACCEPT_STATUS) {
		return { statusName: 'Accepted' };
	} else if (status === DECLINE_STATUS) {
		return { statusName: 'Declined' };
	}

	return { statusName: 'Pending' };
};
