import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import UserProfile from '../../components/UserProfile';

const UserBookingTimes = () => {
	return (
		<View className='h-full bg-white'>
			<Stack.Screen
				options={{
					headerTitle: 'Booking',
					headerRight: () => <UserProfile />,
					headerTitleAlign: 'center',
					headerTitleStyle: { color: 'white' },
					headerStyle: { backgroundColor: '#0085FF' },
				}}
			/>

			<Text>Page User Can See Dates/Times That They Have Appointment</Text>
		</View>
	);
};

export default UserBookingTimes;
