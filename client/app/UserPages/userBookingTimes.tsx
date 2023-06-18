import { Stack } from 'expo-router';
import { ScrollView, View, Text } from 'react-native';
import UserProfile from '../../components/UserProfile';
import { useFetchUserBookingTime } from '../../hooks/UserPages/BookingTimes/useFetchUserBookingTimes';
import { SelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import LoadingDisplay from '../../components/LoadingDisplay';
import { UserBookingTimeInterface } from '../../shared/interfaces/userBookingTimes.interface';
import UserBookingTimeCard from '../../components/UserPages/BookingTimes/UserBookingTimeCard';
import { COLORS as colorSet } from '../../constants/theme';
import styles from '../../styles/styleSheet';
import { selectBookingData } from '../../shared/selectBookingData';

const UserBookingTimes = () => {
	const [selected, setSelected] = useState<string>('All');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [bookings, setBookings] = useState<UserBookingTimeInterface[]>([]);

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

	// FUTURE FIX ADD useFocusEffect
	useFetchUserBookingTime({
		appointmentStatus: selected,
		setIsLoading: setIsLoading,
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

			<View className='py-3 px-5 h-20 w-full items-center border-b-2 border-black flex-row relative z-50'>
				<View className='w-[40%] h-full items-center justify-start flex-row'>
					<Text className='font-semibold text-base capitalize'>
						Select type:
					</Text>
				</View>
				<View className='w-[60%] h-full relative'>
					<View className='transform w-full h-full translate-x-1/2 translate-y-1/2 absolute top-1'>
						<SelectList
							setSelected={ChangeSelected}
							data={selectBookingData}
							save='value'
							search={false}
							dropdownStyles={{ height: 165, backgroundColor: colorSet.white }}
						/>
					</View>
				</View>
			</View>

			{isLoading && <LoadingDisplay header='Loading...' />}

			<ScrollView contentContainerStyle={styles.scrollView}>
				{bookings.map((booking, index) => (
					<UserBookingTimeCard key={index} bookingTimeCard={booking} />
				))}
			</ScrollView>
		</View>
	);
};

export default UserBookingTimes;
