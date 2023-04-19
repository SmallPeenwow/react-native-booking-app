import { Stack } from 'expo-router';
import Footer from '../components/Footer';

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: 'login',
};

export default function Layout() {
	return (
		<>
			<Stack />
			<Footer />
		</>
	);
}
