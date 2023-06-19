import { Text, TouchableOpacity } from 'react-native';
import { useCreateDateTimeToSend } from '../../../hooks/UserPages/FrontPage/useCreateDateTimeToSend';
import { useCompareDateBookingStatus } from '../../../hooks/UserPages/FrontPage/useCompareDateBookingStatus';

type SlotDisplayProps = {
	day: string;
	month: string;
	year: string;
	time: string;
	datesBooked: string[];
	setShow: (action: boolean) => void;
	setSelectedBooking: (action: string) => void;
	setDateDialogDisplay: (action: string) => void;
};

// TODO: maybe put is loading here
const SlotDisplay = ({
	day,
	month,
	year,
	time,
	datesBooked,
	setShow,
	setSelectedBooking,
	setDateDialogDisplay,
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

	const PressEvent = () => {
		setSelectedBooking(dateTime);
		setDateDialogDisplay(`${day} ${month} ${year} ${time}`);
		setShow(true);
	};

	return (
		<TouchableOpacity
			onPress={PressEvent}
			className={`${
				status === 'Available' ? 'bg-white' : 'bg-red-500'
			} w-28 p-2 h-10 border-[1px] border-black border-t-0 border-l-0 items-center`}
		>
			<Text className='text-black font-semibold'>{status}</Text>
		</TouchableOpacity>
	);
};

export default SlotDisplay;
