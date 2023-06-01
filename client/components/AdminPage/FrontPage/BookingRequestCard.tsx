import { View, Text } from 'react-native';
import containerStyles from '../../../styles/containerStyles';

// TODO: should be one object and do the custom stuff inside the here
type BookingRequestCardProps = {
	fullName: string;
	cellNumber: string;
	time: string;
	date: string;
	visit: string;
	location: string;
};

//TODO: pass in the booking id into the pressable stuff

const BookingRequestCard = () => {
	return (
		<View
			className='w-11/12 h-32 border-main-color border-2 bg-white rounded-lg p-2 flex-row'
			style={containerStyles.container}
		>
			<View className='basis-[55%] justify-between'>
				<View>
					<Text className='text-base'>Joe Dirt</Text>
					<Text className='text-base'>078 890 2345</Text>
				</View>

				<View className='pb-2'>
					<Text className='text-base'>10:00 AM</Text>
					<Text className='text-base'>9 Friday June 2023</Text>
				</View>
			</View>
			<View className='basis-[45%] items-start justify-between'>
				<View className='flex-row gap-2'>
					<Text className='font-bold'>Visit:</Text>
					<Text>Home</Text>
				</View>

				<View className='pt-1'>
					<Text className='font-bold'>Location:</Text>
					<Text className='flex-wrap'>1 Street Rd Nahoon</Text>
				</View>

				{/* TODO: make these pressable and then style again */}
				<View className='flex-row w-full justify-end'>
					<Text className='text-red-500 font-semibold text-base'>Decline</Text>
					<Text className='text-green-500 font-semibold text-base'>Accept</Text>
				</View>
			</View>
		</View>
	);
};

export default BookingRequestCard;
