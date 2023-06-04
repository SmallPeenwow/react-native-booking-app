import { View, Text } from 'react-native';
import { AcceptedBookingsTypes } from '../../../shared/types/acceptedBookings.type';
import { useDateTimeMaking } from '../../../hooks/useDateTimeMaking';
import { useCellNumberSpacing } from '../../../hooks/useCellNumberSpacing';

type AcceptedBookingsCardProps = {
	acceptedBooking: AcceptedBookingsTypes;
};

const AcceptedBookingsCard = ({
	acceptedBooking,
}: AcceptedBookingsCardProps) => {
	const { time, day } = useDateTimeMaking({
		dateTime: acceptedBooking.date.toString(),
	});

	const { spacedNumber } = useCellNumberSpacing({
		number: acceptedBooking.user.cell_number,
	});

	// TODO: make something for when time is equal or past the time

	return (
		<View className='w-11/12 h-44 bg-white border-2 border-main-color rounded-lg p-2 flex-row'>
			<View className='basis-[45%] items-start gap-2'>
				<View className='flex-row'>
					<Text className='font-bold pr-2'>Name:</Text>
					<View className='flex-row gap-1'>
						<Text>{acceptedBooking.user.name}</Text>
						<Text>
							{acceptedBooking.user.surname === ''
								? '-'
								: acceptedBooking.user.surname}
						</Text>
					</View>
				</View>
				<View className='flex-row'>
					<Text className='font-bold pr-2'>Age:</Text>
					<Text className=''>
						{new Date().getFullYear() -
							new Date(acceptedBooking.user.age).getFullYear()}
					</Text>
				</View>
				<View>
					<Text className='font-bold'>Contact Number:</Text>
					<Text>{spacedNumber}</Text>
				</View>
				{acceptedBooking.address !== null ||
				acceptedBooking.location_type !== 'office' ? (
					<View className='flex-row flex-wrap'>
						<Text className='font-bold pr-2'>Address:</Text>
						<Text>{acceptedBooking.address}</Text>
					</View>
				) : (
					''
				)}
			</View>
			<View className='basis-[55%] relative items-start gap-2'>
				<View className='flex-row'>
					<Text className='font-bold pr-2'>Visit:</Text>
					<Text>{acceptedBooking.location_type}</Text>
				</View>
				<View className='flex-row'>
					<Text className='font-bold pr-2'>Date:</Text>
					<View>
						<Text>{day}</Text>
						<Text>{time}</Text>
					</View>
				</View>

				<View className='absolute bottom-1 right-5'>
					<Text className='text-xl font-semibold'>Waiting...</Text>
				</View>
			</View>
		</View>
	);
};

export default AcceptedBookingsCard;
