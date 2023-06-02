import { ScrollView, View } from 'react-native';
import BookingRequestCard from '../../components/AdminPage/FrontPage/BookingRequestCard';
import { Stack, useFocusEffect } from 'expo-router';
import { useState } from 'react';
import { ProcessFetch } from '../../hooks/AdminPages/FrontPage/ProcessFetch';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';

interface User {
	address: string;
	age: number;
	cell_number: string;
	name: string;
	surname: string;
}

export interface Appointments {
	appointment_id: number;
	date: number;
	location_type: string;
	user: User;
}

const FrontPage = () => {
	// TODO some type of is loading and onload of page thing
	const [appointment, setAppointment] = useState([]);

	// FIX: Make another function that runs and does this or component
	ProcessFetch({ setState: setAppointment });

	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/',
	});

	// useFocusEffect(
	// 	useCallback( () => {
	// 		// const bookings = await fetchPendingRequests();

	// 		return () =>  fetchPendingRequests()
	// 	}, [])
	// )

	return (
		<View className='h-full bg-neutral-50'>
			<Stack.Screen
				options={{
					headerTitle: 'Home',
					headerTitleAlign: 'center',
					headerTitleStyle: { color: 'white' },
					headerStyle: { backgroundColor: '#0085FF' },
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
				{appointment.map((data, index) => (
					<BookingRequestCard key={index} appointment={data} />
				))}
			</ScrollView>
		</View>
	);
};

export default FrontPage;
