import { Text, View } from 'react-native';
import { Stack } from 'expo-router';
import UserProfile from '../../components/UserProfile';
import { AsyncStorageRetrieve } from '../../hooks/LocalStorage/AsyncStorageRetrieve';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';

const FrontPage = () => {
	AsyncStorageRetrieve('Justin-Bowden-booking-application-id').then((data) => {
		console.log(data);
		// How to get the value because of some promise thing
	});

	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/',
	});

	return (
		<View className='h-full bg-green-400 p-2'>
			<Stack.Screen
				options={{
					headerTitle: 'Booking Dates',
					headerRight: () => <UserProfile />,
					headerTitleAlign: 'center',
				}}
			/>
			<View className='gap-6'>
				<View className='items-end '></View>
				<View>
					<Text>
						Page User Can See What Dates/Times Are Available Or Booked
					</Text>
					<Text>Second Page User Will See After Signing In</Text>
				</View>
			</View>
		</View>
	);
};

export default FrontPage;
