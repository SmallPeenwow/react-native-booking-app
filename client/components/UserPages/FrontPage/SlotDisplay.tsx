import { Text, TouchableOpacity } from 'react-native';
import { useCreateDateTimeToSend } from '../../../hooks/UserPages/FrontPage/useCreateDateTimeToSend';
import { useCompareDateBookingStatus } from '../../../hooks/UserPages/FrontPage/useCompareDateBookingStatus';
import { PressEventTypes } from '../../../shared/types/pressEvent.type';

type SlotDisplayProps = {
	day: string;
	month: string;
	year: string;
	time: string;

	datesBooked: string[];
	PressEvent: ({ day, month, year, time, dateTime }: PressEventTypes) => void;
};

const SlotDisplay = ({
	day,
	month,
	year,
	time,
	datesBooked,

	PressEvent,
}: SlotDisplayProps) => {
	const { dateTime } = useCreateDateTimeToSend({
		day: day,
		month: month,
		year: year,
		time: time,
	});

	const { status } = useCompareDateBookingStatus({
		datesBooked: datesBooked,
		dateTime: dateTime,
	});

	const PressEventTouchableOpacity = () => {
		PressEvent({
			day: day,
			month: month,
			year: year,
			time: time,
			dateTime: dateTime,
		});
	};

	return (
		<TouchableOpacity
			onPress={PressEventTouchableOpacity}
			className={`${
				status === 'Available' ? 'bg-white' : 'bg-red-500'
			} w-28 p-2 h-10 border-[1px] border-black border-t-0 border-l-0 items-center`}
		>
			<Text className='text-black font-semibold'>{status}</Text>
		</TouchableOpacity>
	);
};

export default SlotDisplay;
