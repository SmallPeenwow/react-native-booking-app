import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import containerStyles from '../../../styles/containerStyles';
import { useCellNumberSpacing } from '../../../hooks/useCellNumberSpacing';
import { useDateTimeMaking } from '../../../hooks/useDateTimeMaking';
import buttonStyles from '../../../styles/buttonStyles';
import { Appointments } from '../../../shared/types/appointments.type';
import { confirmAlert } from 'react-confirm-alert';
import { useBookingAction } from '../../../hooks/Socket.io/Admin/useBookingAction';
import { useResponseFunction } from '../../../hooks/AdminPages/AcceptedBookings/useResponseFunction';

type BookingRequestCardProps = {
	appointment: Appointments;
	appointmentArray: Appointments[];
	setAppointmentArray: (action: Appointments[]) => void;
	setResponseMessage: (action: string) => void;
	setErrorMessage: (action: string) => void;
	setIsSuccess: (action: boolean) => void;
	setIsLoading: (action: boolean) => void;
	setIsError: (action: boolean) => void;
};

const BookingRequestCard = ({
	appointment,
	appointmentArray,
	setAppointmentArray,
	setResponseMessage,
	setErrorMessage,
	setIsSuccess,
	setIsLoading,
	setIsError,
}: BookingRequestCardProps) => {
	const { spacedNumber } = useCellNumberSpacing({
		number: appointment.user.cell_number,
	});

	const { time, day } = useDateTimeMaking({
		dateTime: appointment.date.toString(),
	});

	const { SocketBookingActionResponse } = useBookingAction({
		date: appointment.date.toString(),
	});

	const RemoveDiv = () => {
		setAppointmentArray(
			appointmentArray.filter((value) => value !== appointment)
		);
	};

	// HERE-HOOK?
	const ResponseFunction = (response: string) => {
		if (Platform.OS === 'web') {
			confirmAlert({
				title: 'Booking Request',
				message: `Do you want to ${response.toUpperCase()} this booking?`,
				buttons: [
					{
						label: 'No',
						onClick: () => {},
					},
					{
						label: 'Yes',
						onClick: () =>
							useResponseFunction({
								appointmentId: appointment.appointment_id,
								response: response,
								setIsLoading: setIsLoading,
								setIsSuccess: setIsSuccess,
								setIsError: setIsError,
								setResponseMessage: setResponseMessage,
								setErrorMessage: setErrorMessage,
								RemoveDiv: RemoveDiv,
								SocketBookingActionResponse: SocketBookingActionResponse,
							}),
					},
				],
				closeOnEscape: true,
				closeOnClickOutside: true,
				overlayClassName: '',
			});
		} else {
			Alert.alert(
				'Booking Request',
				`Do you want to ${response.toUpperCase()} this booking?`,
				[
					{
						text: 'No',
						onPress: () => {},
						style: 'cancel',
					},
					{
						text: 'Yes',
						onPress: () => {
							useResponseFunction({
								appointmentId: appointment.appointment_id,
								response: response,
								setIsLoading: setIsLoading,
								setIsSuccess: setIsSuccess,
								setIsError: setIsError,
								setResponseMessage: setResponseMessage,
								setErrorMessage: setErrorMessage,
								RemoveDiv: RemoveDiv,
								SocketBookingActionResponse: SocketBookingActionResponse,
							});
						},
					},
				]
			);
		}
	};

	return (
		<View
			className='w-11/12 h-40 bg-main-color rounded-lg p-2 flex-row'
			style={containerStyles.container}
		>
			<View className='w-[50%]'>
				<View>
					<Text className='text-base break-words mb-1 text-white'>
						{appointment.user.name} {appointment.user.surname}
					</Text>
					<Text className='text-base text-white'>{spacedNumber}</Text>
				</View>

				<View className='pb-2 mt-5'>
					<Text className='text-sm mb-1 text-white'>{time}</Text>
					<Text className='text-sm text-white break-words'>{day}</Text>
				</View>
			</View>
			<View className='w-[50%] items-start relative'>
				<View className='flex-row gap-2'>
					<Text className='font-bold text-white'>Visit:</Text>
					<Text className='text-white'>{appointment.location_type}</Text>
				</View>

				<View className='flex-row gap-2'>
					<Text className='font-bold text-white'>Age:</Text>
					<Text className='text-white'>
						{new Date().getFullYear() -
							new Date(appointment.user.age).getFullYear()}
					</Text>
				</View>

				<View className='pt-1'>
					<Text className='font-bold text-white'>Location:</Text>
					<Text className='flex-wrap text-white'>
						{appointment.location_type === 'office'
							? '---'
							: appointment.address}
					</Text>
				</View>

				<View className='flex-row w-full absolute bottom-0 justify-end'>
					<TouchableOpacity
						style={buttonStyles.button}
						className='p-1 px-2 rounded bg-red-500 mr-2'
						onPress={() => ResponseFunction('decline')}
					>
						<Text className='text-white font-semibold text-base'>Decline</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={buttonStyles.button}
						className='p-1 px-2 rounded bg-green-600'
						onPress={() => ResponseFunction('accept')}
					>
						<Text className='text-white font-semibold text-base'>Accept</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default BookingRequestCard;
