import { View, Text } from 'react-native';
import { UserBookingTimeInterface } from '../../../shared/interfaces/userBookingTimes.interface';
import { useDateTimeMaking } from '../../../hooks/useDateTimeMaking';
import { useBookingStatusName } from '../../../hooks/UserPages/BookingTimes/useBookingStatusName';
import containerStyles from '../../../styles/containerStyles';

type UserBookingTimeCardProps = {
	bookingTimeCard: UserBookingTimeInterface;
};

const UserBookingTimeCard = ({ bookingTimeCard }: UserBookingTimeCardProps) => {
	const { time, day } = useDateTimeMaking({
		dateTime: bookingTimeCard.date,
	});

	const { statusName } = useBookingStatusName({
		status: bookingTimeCard.appointment_status,
	});

	return (
		<View
			className={`border-2 bg-white p-2 w-5/6 rounded-lg flex-row h-32 justify-center ${
				bookingTimeCard.appointment_status === 'accept'
					? 'border-green-600'
					: bookingTimeCard.appointment_status === 'decline'
					? 'border-red-600'
					: 'border-yellow-600'
			}`}
			style={containerStyles.container}
		>
			<View className='flex-[60%] gap-2'>
				<View>
					<Text className='font-bold text-lg'>Date:</Text>
					<Text className='font-semibold'>{day}</Text>
				</View>
				<View>
					<Text className='font-bold text-lg'>Time:</Text>
					<Text className='font-semibold'>{time}</Text>
				</View>
			</View>
			<View className='flex-[40%] relative'>
				<View className='flex-row gap-2 items-center justify-start'>
					<Text className='font-bold text-lg'>Visit:</Text>
					<Text className='text-lg font-semibold'>
						{bookingTimeCard.location_type}
					</Text>
				</View>
				<View className='absolute bottom-1 right-4'>
					<Text
						className={`text-2xl ${
							bookingTimeCard.appointment_status === 'accept'
								? 'text-green-600'
								: bookingTimeCard.appointment_status === 'decline'
								? 'text-red-600'
								: 'text-yellow-600'
						}`}
					>
						{statusName}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default UserBookingTimeCard;
