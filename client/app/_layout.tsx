import { Stack } from 'expo-router';
import Footer from '../components/Footer';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	useEffect(() => {
		setTimeout(() => {
			SplashScreen.hideAsync();
		}, 1000);
	}, []);

	return (
		<>
			<Stack />
			<Footer />
		</>
	);
}
