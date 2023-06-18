import { ScrollView, View } from 'react-native';
import BookingRequestCard from '../../components/AdminPage/FrontPage/BookingRequestCard';
import { Stack, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useProcessFetch } from '../../hooks/AdminPages/FrontPage/useProcessFetch';
import SuccessfulMessage from '../../components/SuccessfulMessage';
import LoadingDisplay from '../../components/LoadingDisplay';
import { Appointments } from '../../shared/types/appointments.type';

const FrontPage = () => {
	const [appointmentArray, setAppointmentArray] = useState<Appointments[]>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [responseMessage, setResponseMessage] = useState<string>('');

	useFocusEffect(
		useCallback(() => {
			const fetch = async () => {
				await useProcessFetch({ setState: setAppointmentArray });
			};

			fetch();
			return () => {};
		}, [])
	);

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

			{isSuccess && (
				<SuccessfulMessage
					title={responseMessage}
					isSuccess={isSuccess}
					setIsSuccess={setIsSuccess}
				/>
			)}

			{isLoading && <LoadingDisplay header='Loading...' />}

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
				{appointmentArray === undefined ? (
					<View className='h-screen items-center justify-center w-full'>
						<LoadingDisplay header='Loading...' />
					</View>
				) : (
					appointmentArray.map((appointment, index) => (
						<BookingRequestCard
							key={index}
							appointment={appointment}
							appointmentArray={appointmentArray}
							setAppointmentArray={setAppointmentArray}
							setResponseMessage={setResponseMessage}
							setIsSuccess={setIsSuccess}
							setIsLoading={setIsLoading}
						/>
					))
				)}
			</ScrollView>
		</View>
	);
};

export default FrontPage;
