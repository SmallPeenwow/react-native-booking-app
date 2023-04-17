import React from 'react';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
	default: 'native',
});

const Home = () => {
	return (
		<View className='flex-1 items-center justify-center bg-red-600 h-full'>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style='auto' />
		</View>
	);
};

export default Home;
