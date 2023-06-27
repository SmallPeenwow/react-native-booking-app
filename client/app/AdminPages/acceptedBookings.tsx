import { ScrollView, View, Text } from 'react-native';
import { Stack, useFocusEffect } from 'expo-router';
import { useFetchAcceptedBookings } from '../../hooks/AdminPages/AcceptedBookings/useFetchAcceptedBookings';
import { useCallback, useState } from 'react';
import AcceptedBookingsCard from '../../components/AdminPage/AcceptedBookings/AcceptedBookingCard';
import { AcceptedBookingsTypes } from '../../shared/types/acceptedBookings.type';
import { COLORS as colorSet } from '../../constants/theme';
import adminStyles from '../../styles/AdminPage/styleSheet';
import PlainActivityIndicator from '../../components/PlainActivityIndicator';

const AcceptedBookings = () => {
	const [acceptedBookings, setAcceptedBookings] =
		useState<AcceptedBookingsTypes[]>();

	// FUTURE UPDATE: Make drop down to select max day to view
	// TODO: Must have text saying no booking it this amount of days

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

			{acceptedBookings?.length === 0 && <Text>Yes</Text>}

			{acceptedBookings === undefined ? (
				<PlainActivityIndicator />
			) : (
				<ScrollView contentContainerStyle={adminStyles.scrollView}>
					{acceptedBookings.map((acceptedBooking, index) => (
						<AcceptedBookingsCard
							key={index}
							acceptedBooking={acceptedBooking}
						/>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default AcceptedBookings;
