import { Text, TouchableOpacity, Alert } from 'react-native';
import { useCreateDateTimeToSend } from '../../../hooks/UserPages/FrontPage/useCreateDateTimeToSend';

type SlotDisplayProps = {
	title: string;
	day: string;
	month: string;
	year: string;
	time: string;
	setShow: (action: boolean) => void;
	setSelectedBooking: (action: string) => void;
	setDateDialogDisplay: (action: string) => void;
};

const SlotDisplay = ({
	title,
	day,
	month,
	year,
	time,
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

	const PressEvent = () => {
		setSelectedBooking(dateTime);
		setDateDialogDisplay(`${day} ${month} ${year} ${time}`);
		setShow(true);
	};

	return (
		<TouchableOpacity
			onPress={PressEvent}
			className='bg-white w-28 p-2 h-10 border-[1px] border-black border-t-0 border-l-0 items-center'
		>
			<Text className='text-black font-semibold'>{title}</Text>
		</TouchableOpacity>
	);
};

export default SlotDisplay;
