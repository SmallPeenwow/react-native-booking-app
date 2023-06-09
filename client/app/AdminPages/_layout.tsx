import { Tabs } from 'expo-router';
import { FontAwesome, Foundation } from '@expo/vector-icons';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';

const _layout = () => {
	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/',
	});

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: '#ebebeb',
					height: 50,
					paddingTop: 5,
					paddingBottom: 5,
				},
				headerShown: true,
			}}
		>
			<Tabs.Screen
				name='frontPage'
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ focused }) => (
						<FontAwesome
							name='home'
							size={24}
							color={focused ? '#0085FF' : 'black'}
						/>
					),
					tabBarActiveTintColor: '#0085FF',
					tabBarInactiveTintColor: 'black',
				}}
			/>
			<Tabs.Screen
				name='acceptedBookings'
				options={{
					tabBarLabel: 'Booking',
					tabBarIcon: ({ focused }) => (
						<Foundation
							name='book-bookmark'
							size={24}
							color={focused ? '#0085FF' : 'black'}
						/>
					),
					tabBarActiveTintColor: '#0085FF',
					tabBarInactiveTintColor: 'black',
				}}
			/>
		</Tabs>
	);
};

export default _layout;
