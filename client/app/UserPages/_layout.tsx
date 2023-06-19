import { Tabs } from 'expo-router';
import { Foundation, FontAwesome } from '@expo/vector-icons';
import styles from '../../styles/styleSheet';
import { COLORS as colorSet } from '../../constants/theme';
import { useBackActionEvent } from '../../hooks/BackHandler/useBackActionEvent';

const _layout = () => {
	useBackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/',
	});

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: styles.tabBar,
				headerShown: true,
			}}
		>
			<Tabs.Screen
				name='userFrontPage'
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ focused }) => (
						<FontAwesome
							name='home'
							size={24}
							color={focused ? colorSet.primary : colorSet.black}
						/>
					),
					tabBarActiveTintColor: colorSet.primary,
					tabBarInactiveTintColor: colorSet.black,
				}}
			/>
			<Tabs.Screen
				name='userBookingTimes'
				options={{
					tabBarLabel: 'Booking',
					tabBarIcon: ({ focused }) => (
						<Foundation
							name='book-bookmark'
							size={24}
							color={focused ? colorSet.primary : colorSet.black}
						/>
					),
					tabBarActiveTintColor: colorSet.primary,
					tabBarInactiveTintColor: colorSet.black,
				}}
			/>
		</Tabs>
	);
};

export default _layout;
