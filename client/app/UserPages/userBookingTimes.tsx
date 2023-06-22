import { Stack } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import UserProfile from '../../components/UserProfile';
import { useFetchUserBookingTime } from '../../hooks/UserPages/BookingTimes/useFetchUserBookingTimes';
import { useState } from 'react';
import LoadingDisplay from '../../components/LoadingDisplay';
import { UserBookingTimeInterface } from '../../shared/interfaces/userBookingTimes.interface';
import UserBookingTimeCard from '../../components/UserPages/BookingTimes/UserBookingTimeCard';
import { COLORS as colorSet } from '../../constants/theme';
import styles from '../../styles/styleSheet';
import { selectBookingData } from '../../shared/selectBookingData';
import DropDownContainer from '../../components/UserPages/BookingTimes/DropDownContainer';
import { socket } from '../index';
import { UserBookingResponseStatus } from '../../shared/types/userBookingResponseStatus.type';

const UserBookingTimes = () => {
	const [selected, setSelected] = useState<string>('All');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [bookings, setBookings] = useState<UserBookingTimeInterface[]>([]);
	const [bookingResponseType, setBookingResponseType] = useState<string>('');
	// TODO: must handle error when there is no pending or any of the other ones

	// TODO: do socket function here to loop over bookings and change string values with match of date and status
	socket.on(
		'user-booking-response-status',
		({ statusResponse, date }: UserBookingResponseStatus) => {
			console.log(statusResponse, date, ' user booking times');
			// const copiedData: UserBookingTimeInterface[] = [...bookings];

			// const modifiedData: UserBookingTimeInterface | undefined = bookings.find(
			// 	(item: UserBookingTimeInterface) => item.date.toString() === date
			// );

			// console.log(modifiedData, ' modified');
			// if (modifiedData !== undefined) {
			// 	const updatedBooking: UserBookingTimeInterface = {
			// 		appointment_status: statusResponse,
			// 		date: parseInt(date),
			// 		location_type: modifiedData.location_type,
			// 	};

			// 	const updatedDate: UserBookingTimeInterface[] = bookings.map((item) => {
			// 		return item.date === updatedBooking.date ? updatedBooking : item;
			// 	});

			let foundDate: boolean = false;
			const updatedBookings: UserBookingTimeInterface[] = bookings
				.filter((item) => item.date.toString() !== date)
				.map((item) => {
					if (item.date.toString() === date) {
						foundDate = true;
						return { ...item, appointment_status: statusResponse };
					}
					return item;
				});

			console.log(bookings, ' old');
			if (foundDate) {
				setBookings(updatedBookings);
				console.log(bookings, ' new');
			}
			// }

			// const updatedBookings: UserBookingTimeInterface[] = bookings.map(
			// 	(booking) => {
			// 		if (booking.date.toString() === date) {
			// 			return { ...booking, appointment_status: statusResponse };
			// 		}

			// 		return booking;
			// 	}
			// );
		}
	);

	const ChangeSelected = (value: string) => {
		setSelected(
			value === 'Accepted'
				? 'accept'
				: value === 'Declined'
				? 'decline'
				: value === 'Pending'
				? 'pending'
				: 'All'
		);
	};

	// FUTURE FIX ADD for socket.io, maybe useFocusEffect
	useFetchUserBookingTime({
		appointmentStatus: selected,
		setIsLoading: setIsLoading,
		setIsError: setIsError,
		setBookingResponseType: setBookingResponseType,
		setBookings: setBookings,
	});

	return (
		<View className='h-full bg-white'>
			<Stack.Screen
				options={{
					headerTitle: 'Booking',
					headerRight: () => <UserProfile />,
					headerTitleAlign: 'center',
					headerTitleStyle: { color: colorSet.white },
					headerStyle: { backgroundColor: colorSet.primary },
				}}
			/>

			<View className='border-b border-black z-50'>
				<DropDownContainer
					SelectedState={ChangeSelected}
					dataArray={selectBookingData}
				/>
			</View>

			{isLoading && <LoadingDisplay header='Loading...' />}

			<ScrollView contentContainerStyle={styles.scrollView}>
				{isError ? (
					<View className='w-full p-4 text-center justify-center'>
						<Text className='text-2xl'>{bookingResponseType}</Text>
					</View>
				) : (
					bookings.map((booking, index) => (
						<UserBookingTimeCard key={index} bookingTimeCard={booking} />
					))
				)}
			</ScrollView>
		</View>
	);
};

export default UserBookingTimes;
