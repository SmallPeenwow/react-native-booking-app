import { View, Text, TouchableOpacity } from 'react-native';
import containerStyles from '../../../styles/containerStyles';
import { Appointments } from '../../../app/AdminPages/frontPage';
import { CellNumberSpacing } from '../../../hooks/CellNumberSpacing';
import { DateTimeMaking } from '../../../hooks/DateTimeMaking';
import buttonStyles from '../../../styles/buttonStyles';

type BookingRequestCardProps = {
	appointment: Appointments;
};

const BookingRequestCard = ({ appointment }: BookingRequestCardProps) => {
	const { spacedNumber } = CellNumberSpacing({
		number: appointment.user.cell_number,
	});
	const { time, day } = DateTimeMaking({
		dateTime: appointment.date.toString(),
	});

	return (
		<View
			className='w-11/12 h-32 bg-main-color rounded-lg p-2 flex-row'
			style={containerStyles.container}
		>
			<View className='basis-[55%] justify-between'>
				<View>
					<Text className='text-base text-white'>
						{appointment.user.name} {appointment.user.surname}
					</Text>
					<Text className='text-base text-white'>{spacedNumber}</Text>
				</View>

				<View className='pb-2'>
					<Text className='text-base text-white'>{time}</Text>
					<Text className='text-base text-white'>{day}</Text>
				</View>
			</View>
			<View className='basis-[45%] items-start justify-between'>
				<View className='flex-row gap-2'>
					<Text className='font-bold text-white'>Visit:</Text>
					<Text className='text-white'>{appointment.location_type}</Text>
				</View>
				{/* TODO: Put Age here */}
				<View className='pt-1'>
					<Text className='font-bold text-white'>Location:</Text>
					<Text className='flex-wrap text-white'>
						{appointment.location_type === 'office'
							? '---'
							: appointment.location_type}
					</Text>
				</View>

				{/* TODO: make these pressable and then style again */}
				<View className='flex-row w-full justify-end'>
					<TouchableOpacity
						style={buttonStyles.button}
						className='p-1 px-2 rounded bg-slate-200 mr-2'
						onPress={() => {}}
					>
						<Text className='text-red-500 font-semibold text-base'>
							Decline
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={buttonStyles.button}
						className='p-1 px-2 rounded bg-slate-200'
						onPress={() => {}}
					>
						<Text className='text-green-600 font-semibold text-base'>
							Accept
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default BookingRequestCard;
