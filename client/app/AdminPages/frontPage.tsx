import { ActivityIndicator, ScrollView, View } from 'react-native';
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
			{/* // MAYBE: remove View */}
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

			<ScrollView contentContainerStyle={adminStyles.scrollView}>
				{appointmentArray === undefined ? (
					<View className='h-full items-center justify-center w-full'>
						<ActivityIndicator
							size='large'
							style={adminStyles.activityIndicator}
							color={colorSet.primary}
						/>
					</View>
				) : (
					appointmentArray.map((appointment, index) => (
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
					))
				)}
			</ScrollView>
		</View>
	);
};

export default FrontPage;
