import { useCallback } from 'react';
import { PressEventTypes } from '../../../shared/types/pressEvent.type';

type usePressEventProps = {
	setShow: (action: boolean) => void;
	setSelectedBooking: (action: string) => void;
	setDateDialogDisplay: (action: string) => void;
};

export const usePressEvent = ({
	setSelectedBooking,
	setDateDialogDisplay,
	setShow,
}: usePressEventProps) => {
	const PressEvent = useCallback(
		({ day, month, year, time, dateTime }: PressEventTypes) => {
			setSelectedBooking(dateTime);
			setDateDialogDisplay(`${day} ${month} ${year} ${time}`);
			setShow(true);
		},
		[setSelectedBooking, setDateDialogDisplay, setShow]
	);

	return { PressEvent };
};
