import { View, Text } from 'react-native';
import SlotDisplay from './SlotDisplay';
import { PressEventTypes } from '../../../shared/types/pressEvent.type';

type DaySlotTableDisplayProps = {
	year: string;
	month: string;
	day: string;

	times: string[];
	datesBooked: string[];
	PressEvent: ({ day, month, year, time, dateTime }: PressEventTypes) => void;
};

const DaySlotTableDisplay = ({
	year,
	month,
	day,

	times,
	datesBooked,
	PressEvent,
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
						year={year}
						month={month}
						day={day}
						datesBooked={datesBooked}
						time={value}
						PressEvent={PressEvent}
					/>
				))}
			</View>
		</View>
	);
};

export default DaySlotTableDisplay;
