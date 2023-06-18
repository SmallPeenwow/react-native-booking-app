import { ScrollView, View } from 'react-native';
import { Stack, useFocusEffect } from 'expo-router';
import { useFetchAcceptedBookings } from '../../hooks/AdminPages/AcceptedBookings/useFetchAcceptedBookings';
import { useCallback, useState } from 'react';
import LoadingDisplay from '../../components/LoadingDisplay';
import AcceptedBookingsCard from '../../components/AdminPage/AcceptedBookings/AcceptedBookingCard';
import { AcceptedBookingsTypes } from '../../shared/types/acceptedBookings.type';

const AcceptedBookings = () => {
	const [acceptedBookings, setAcceptedBookings] =
		useState<AcceptedBookingsTypes[]>();

	// FUTURE UPDATE: Make drop down to select max day to view

	// Must do socket.io and useEffect for update

	useFocusEffect(
		useCallback(() => {
			const fetchAccepted = async () => {
				await useFetchAcceptedBookings({
					setAcceptedBookings: setAcceptedBookings,
				});
			};

			fetchAccepted();
			return () => {};
		}, [])
	);

	return (
		<View className='h-full bg-white'>
			<Stack.Screen
				options={{
					headerTitle: 'Accepted Bookings',
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
					marginTop: 15,
					paddingBottom: 40,
				}}
			>
				{acceptedBookings === undefined ? (
					<View className='h-screen items-center justify-center w-full'>
						<LoadingDisplay header='Loading...' />
					</View>
				) : (
					acceptedBookings.map((acceptedBooking, index) => (
						<AcceptedBookingsCard
							key={index}
							acceptedBooking={acceptedBooking}
						/>
					))
				)}
			</ScrollView>
		</View>
	);
};

export default AcceptedBookings;
