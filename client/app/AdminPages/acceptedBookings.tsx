import { Text, View } from 'react-native';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';
import { Stack } from 'expo-router';

const AcceptedBookings = () => {
	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/',
	});

	return (
		<View className='h-full bg-white'>
			<Stack.Screen
				options={{
					headerTitle: 'Accepted Bookings',
					headerTitleAlign: 'center',
					headerTitleStyle: { color: 'white' },
					headerStyle: { backgroundColor: '#0085FF' },
				}}
			/>

			<Text>Page Admin Can See What Booking They Have For Day Or Week</Text>
		</View>
	);
};

export default AcceptedBookings;
