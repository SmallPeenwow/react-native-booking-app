import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Stack, useFocusEffect } from 'expo-router';
import { useFetchAcceptedBookings } from '../../hooks/AdminPages/AcceptedBookings/useFetchAcceptedBookings';
import { useCallback, useState } from 'react';
import AcceptedBookingsCard from '../../components/AdminPage/AcceptedBookings/AcceptedBookingCard';
import { AcceptedBookingsTypes } from '../../shared/types/acceptedBookings.type';
import { COLORS as colorSet } from '../../constants/theme';
import adminStyles from '../../styles/AdminPage/styleSheet';

const AcceptedBookings = () => {
	const [acceptedBookings, setAcceptedBookings] =
		useState<AcceptedBookingsTypes[]>();

	// FUTURE UPDATE: Make drop down to select max day to view
	// TODO: Must have text saying no booking it this amount of days
	// Must do socket.io or MAYBE a useEffect too for update

	useFocusEffect(
		useCallback(() => {
			const fetchAccepted = async () => {
				await useFetchAcceptedBookings({
					setAcceptedBookings: setAcceptedBookings,
				});
			};

			fetchAccepted();
		}, [])
	);

	return (
		<View className='h-full bg-white'>
			<Stack.Screen
				options={{
					headerTitle: 'Accepted Bookings',
					headerTitleAlign: 'center',
					headerTitleStyle: { color: colorSet.white },
					headerStyle: { backgroundColor: colorSet.primary },
				}}
			/>

			<ScrollView contentContainerStyle={adminStyles.scrollView}>
				{acceptedBookings === undefined ? (
					<View className='h-full items-center justify-center w-full'>
						<ActivityIndicator
							size='large'
							style={adminStyles.activityIndicator}
							color={colorSet.primary}
						/>
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
