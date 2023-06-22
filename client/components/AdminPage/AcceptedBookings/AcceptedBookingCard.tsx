import { View, Text } from 'react-native';
import { AcceptedBookingsTypes } from '../../../shared/types/acceptedBookings.type';
import { useDateTimeMaking } from '../../../hooks/useDateTimeMaking';
import { useCellNumberSpacing } from '../../../hooks/useCellNumberSpacing';
import { useGiveAcceptedBookingsStatus } from '../../../hooks/AdminPages/AcceptedBookings/useGiveAcceptedBookingStatus';
import containerStyles from '../../../styles/containerStyles';

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

	const { status } = useGiveAcceptedBookingsStatus({
		dateCompare: new Date(acceptedBooking.date),
	});

	return (
		<View
			className={`w-11/12 h-44 bg-white border-2 rounded-lg p-2 flex-row ${
				status === 'In Progress...'
					? 'border-amber-600'
					: status === 'Waiting...'
					? 'border-main-color'
					: 'border-green-600'
			}`}
			style={containerStyles.container}
		>
			<View className='w-[45%] items-start gap-2'>
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
			<View className='w-[55%] relative items-start gap-2'>
				<View className='flex-row'>
					<Text className='font-bold pr-2'>Visit:</Text>
					<Text>{acceptedBooking.location_type}</Text>
				</View>
				<View className='flex-row w-full'>
					<Text className='font-bold pr-2'>Date:</Text>
					<View className='w-full'>
						<Text className='break-words w-40'>{day}</Text>
						<Text>{time}</Text>
					</View>
				</View>

				<View className='absolute bottom-1 right-5'>
					<Text className='text-xl font-semibold'>{status}</Text>
				</View>
			</View>
		</View>
	);
};

export default AcceptedBookingsCard;
