import { Text, View } from 'react-native';
import { Stack } from 'expo-router';
import UserProfile from '../../components/UserProfile';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';

const FrontPage = () => {
	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/',
	});

	return (
		<View className='h-full bg-white p-2'>
			<Stack.Screen
				options={{
					headerTitle: 'Home',
					headerRight: () => <UserProfile />,
					headerTitleAlign: 'center',
					headerTitleStyle: { color: 'white' },
					headerStyle: { backgroundColor: '#0085FF' },
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
