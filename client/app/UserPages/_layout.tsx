import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

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
					tabBarIcon: () => <AntDesign name='book' size={24} color='black' />,
				}}
			/>
		</Tabs>
	);
};

export default _layout;
