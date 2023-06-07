import { View, Text } from 'react-native';
import SlotDisplay from './SlotDisplay';

type DaySlotTableDisplayProps = {
	year: string;
	month: string;
	day: string;
	times: string[];
	setShow: (action: boolean) => void;
	setSelectedBooking: (action: string) => void;
	setDateDialogDisplay: (action: string) => void;
};

const DaySlotTableDisplay = ({
	year,
	month,
	day,
	times,
	setShow,
	setSelectedBooking,
	setDateDialogDisplay,
}: DaySlotTableDisplayProps) => {
	return (
		<View className='flex-col'>
			<View className='items-center bg-blue-400 p-2 h-10 border-[1px] border-black border-t-0 border-l-0 w-28'>
				<Text className='text-white font-semibold'>{day}</Text>
			</View>
			<View className='items-center'>
				{times.map((value, index) => (
					<SlotDisplay
						key={index}
						title='Available'
						year={year}
						month={month}
						day={day}
						time={value}
						setShow={setShow}
						setSelectedBooking={setSelectedBooking}
						setDateDialogDisplay={setDateDialogDisplay}
					/>
				))}
			</View>
		</View>
	);
};

export default DaySlotTableDisplay;
