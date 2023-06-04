import { ScrollView, View } from 'react-native';
import BookingRequestCard from '../../components/AdminPage/FrontPage/BookingRequestCard';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { ProcessFetch } from '../../hooks/AdminPages/FrontPage/ProcessFetch';
import { BackActionEvent } from '../../hooks/BackHandler/BackActionEvent';
import SuccessfulMessage from '../../components/SuccessfulMessage';
import LoadingDisplay from '../../components/LoadingDisplay';

type User = {
	age: number;
	cell_number: string;
	name: string;
	surname: string;
};

export type Appointments = {
	appointment_id: number;
	date: number;
	location_type: string;
	address: string;
	user: User;
};

const FrontPage = () => {
	const [appointmentArray, setAppointmentArray] = useState<any[]>();
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [responseMessage, setResponseMessage] = useState('');

	ProcessFetch({ setState: setAppointmentArray });

	BackActionEvent({
		title: 'Hold on!',
		message: 'Are you sure you want to go back?',
		page: '/',
	});

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
					flex: 1,
					marginTop: 15,
				}}
			>
				{appointmentArray === undefined ? (
					<LoadingDisplay header='Loading...' />
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
