import { Tabs } from 'expo-router';
import { FontAwesome, Foundation } from '@expo/vector-icons';

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
				name='adminFrontPage'
				options={{
					tabBarIcon: () => <FontAwesome name='home' size={24} color='black' />,
				}}
			/>
			<Tabs.Screen
				name='acceptedBookings'
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
