import { ScrollView, Text, View } from 'react-native';
import BookingRequestCard from '../../components/AdminPage/FrontPage/BookingRequestCard';
import { Stack } from 'expo-router';
import { fetchPendingRequests } from '../../services/FrontPage/fetchPendingRequests';

const FrontPage = () => {
	// TODO: do await with useCallback look at nested comments project
	const bookings = fetchPendingRequests();
	console.log(bookings);
	return (
		<View className='h-full bg-neutral-50'>
			<Stack.Screen
				options={{
					headerTitle: 'Home',
					headerTitleAlign: 'center',
				}}
			/>

			<ScrollView
				contentContainerStyle={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					gap: 30,
					alignItems: 'center',
					flex: 1,
					marginTop: 15,
				}}
			>
				<BookingRequestCard />
			</ScrollView>
		</View>
	);
};

export default FrontPage;
