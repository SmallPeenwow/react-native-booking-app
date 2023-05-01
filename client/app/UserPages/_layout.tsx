import { Tabs } from 'expo-router';
import { Foundation, FontAwesome } from '@expo/vector-icons';

export const unstable_settings = {
	initialRouteName: 'userFrontPage',
};

const _layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: { backgroundColor: '#ebebeb' },
				headerShown: true,
			}}
		>
			<Tabs.Screen
				name='userFrontPage'
				options={{
					tabBarIcon: () => <FontAwesome name='home' size={24} color='black' />,
				}}
			/>
			<Tabs.Screen
				name='userBookingTimes'
				options={{
					tabBarIcon: () => (
						<Foundation name='book-bookmark' size={24} color='black' />
					),
				}}
			/>
		</Tabs>
	);
};

export default _layout;
