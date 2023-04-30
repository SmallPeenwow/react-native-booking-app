import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';

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
			<Tabs.Screen name='userFrontPage' />
			<Tabs.Screen name='userBookingTimes' />
		</Tabs>
	);
};

export default _layout;
