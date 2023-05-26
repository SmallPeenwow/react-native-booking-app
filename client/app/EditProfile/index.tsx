import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';

const index = () => {
	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/UserPages',
	});

	return (
		<View className='h-full bg-yellow-300'>
			<Stack.Screen
				options={{
					headerTitle: 'User Profile',
				}}
			/>
			<Text>User Can Edit Information</Text>
		</View>
	);
};

export default index;
