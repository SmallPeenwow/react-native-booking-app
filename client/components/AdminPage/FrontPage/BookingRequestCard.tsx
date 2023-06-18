import { View, Text, TouchableOpacity, Alert } from 'react-native';
import containerStyles from '../../../styles/containerStyles';
import { useCellNumberSpacing } from '../../../hooks/useCellNumberSpacing';
import { useDateTimeMaking } from '../../../hooks/useDateTimeMaking';
import buttonStyles from '../../../styles/buttonStyles';
import { ResponseToBooking } from '../../../hooks/AdminPages/FrontPage/ResponseToBooking';
import { Appointments } from '../../../shared/types/appointments.type';

type BookingRequestCardProps = {
	appointment: Appointments;
	appointmentArray: Appointments[];
	setAppointmentArray: (action: Appointments[]) => void;
	setResponseMessage: (action: string) => void;
	setIsSuccess: (action: boolean) => void;
	setIsLoading: (action: boolean) => void;
};

const BookingRequestCard = ({
	appointment,
	appointmentArray,
	setAppointmentArray,
	setResponseMessage,
	setIsSuccess,
	setIsLoading,
}: BookingRequestCardProps) => {
	const { spacedNumber } = useCellNumberSpacing({
		number: appointment.user.cell_number,
	});

	const { time, day } = useDateTimeMaking({
		dateTime: appointment.date.toString(),
	});

	const RemoveDiv = () => {
		setAppointmentArray(
			appointmentArray.filter((value) => value !== appointment)
		);
	};

	const ResponseFunction = (id: number, response: string) => {
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
					onPress: async () => {
						setIsLoading(true);
						let responseMessage = await ResponseToBooking({
							appointmentId: id,
							response: response,
						});

						RemoveDiv();
						setResponseMessage(responseMessage);
						setIsLoading(false);
						setIsSuccess(true);
					},
				},
			]
		);
	};

	return (
		<View
			className='w-11/12 h-40 bg-main-color rounded-lg p-2 flex-row'
			style={containerStyles.container}
		>
			<View className='basis-[55%]'>
				<View>
					<Text className='text-base mb-1 text-white'>
						{appointment.user.name} {appointment.user.surname}
					</Text>
					<Text className='text-base text-white'>{spacedNumber}</Text>
				</View>

				<View className='pb-2 mt-5'>
					<Text className='text-base mb-1 text-white'>{time}</Text>
					<Text className='text-base text-white'>{day}</Text>
				</View>
			</View>
			<View className='basis-[45%] items-start relative'>
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
						onPress={() =>
							ResponseFunction(appointment.appointment_id, 'decline')
						}
					>
						<Text className='text-white font-semibold text-base'>Decline</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={buttonStyles.button}
						className='p-1 px-2 rounded bg-green-600'
						onPress={() =>
							ResponseFunction(appointment.appointment_id, 'accept')
						}
					>
						<Text className='text-white font-semibold text-base'>Accept</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default BookingRequestCard;
