import { ScrollView, View } from 'react-native';
import BookingRequestCard from '../../components/AdminPage/FrontPage/BookingRequestCard';
import { Stack, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { useProcessFetch } from '../../hooks/AdminPages/FrontPage/useProcessFetch';
import SuccessfulMessage from '../../components/SuccessfulMessage';
import LoadingDisplay from '../../components/LoadingDisplay';
import { Appointments } from '../../shared/types/appointments.type';
import adminStyles from '../../styles/AdminPage/styleSheet';
import { COLORS as colorSet } from '../../constants/theme';
import ErrorMessage from '../../components/ErrorMessage';
import PlainActivityIndicator from '../../components/PlainActivityIndicator';

const FrontPage = () => {
	const [appointmentArray, setAppointmentArray] = useState<Appointments[]>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [responseMessage, setResponseMessage] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	useFocusEffect(
		useCallback(() => {
			const fetch = async () => {
				await useProcessFetch({ setState: setAppointmentArray });
			};

			fetch();
		}, [])
	);

	return (
		<View className='h-full bg-neutral-50'>
			<Stack.Screen
				options={{
					headerTitle: 'Home',
					headerTitleAlign: 'center',
					headerTitleStyle: { color: colorSet.white },
					headerStyle: { backgroundColor: colorSet.primary },
				}}
			/>

			{isSuccess && (
				<SuccessfulMessage
					title={responseMessage}
					isSuccess={isSuccess}
					setIsSuccess={setIsSuccess}
				/>
			)}

			{isError && (
				<View className='absolute items-center z-50 top-1/4 w-full'>
					<ErrorMessage
						message={errorMessage}
						isError={isError}
						activeStateChange={setIsError}
					/>
				</View>
			)}

			{isLoading && <LoadingDisplay header='Loading...' />}

			{appointmentArray === undefined ? (
				<PlainActivityIndicator />
			) : (
				// TODO: Message for no booking
				<ScrollView contentContainerStyle={adminStyles.scrollView}>
					{appointmentArray.map((appointment, index) => (
						<BookingRequestCard
							key={index}
							appointment={appointment}
							appointmentArray={appointmentArray}
							setAppointmentArray={setAppointmentArray}
							setErrorMessage={setErrorMessage}
							setResponseMessage={setResponseMessage}
							setIsSuccess={setIsSuccess}
							setIsLoading={setIsLoading}
							setIsError={setIsError}
						/>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default FrontPage;
