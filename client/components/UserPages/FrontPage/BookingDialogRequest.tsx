import {
	View,
	Pressable,
	NativeSyntheticEvent,
	TextInputChangeEventData,
	Alert,
	TouchableOpacity,
} from 'react-native';
import containerStyles from '../../../styles/containerStyles';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { useFetchId } from '../../../hooks/UserPages/FrontPage/useFetchId';
import BookingDialogTouchableButton from './BookingDialogTouchableButton';
import { useSendBookingRequest } from '../../../hooks/UserPages/FrontPage/useSendBookingRequest';
import DialogAddressNote from './Dialog/DialogAddressNote';
import DialogVisitType from './Dialog/DialogVisitType';
// import { socket } from '../../../app/index';

type BookingDialogRequestProps = {
	selectedBooking: string;
	dateDialogDisplay: string;
	currentBookedDates: string[];
	setIsLoading: (action: boolean) => void;
	setIsError: (action: boolean) => void;
	setIsSuccess: (action: boolean) => void;
	setErrorMessage: (action: string) => void;
	setLoadingHeader: (action: string) => void;
	setCurrentBookedDates: (action: string[]) => void;
	OnPressClose: () => void;
};

// SLOW
const BookingDialogRequest = ({
	selectedBooking,
	dateDialogDisplay,
	currentBookedDates,
	setIsLoading,
	setIsError,
	setIsSuccess,
	setErrorMessage,
	setLoadingHeader,
	setCurrentBookedDates,
	OnPressClose,
}: BookingDialogRequestProps) => {
	const [address, setAddress] = useState<string | null>(null);
	const [visitType, setVisitType] = useState<string>('office');

	const { userId } = useFetchId();

	const SetVisitType = (value: string) => {
		setVisitType(value);
	};

	const OnChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setAddress(e.nativeEvent.text);
	};

	const OnPressOK = () => {
		Alert.alert(dateDialogDisplay, 'Do you want to book this day and time?', [
			{
				text: 'No',
				onPress: () => {},
				style: 'cancel',
			},
			{
				text: 'Yes',
				onPress: async () => {
					setLoadingHeader('Processing...');
					setIsLoading(true);
					if (userId == null) {
						setErrorMessage('Id does not exist. Process system failed.');
						setIsError(true);
						return;
					}

					const { SendBookingRequest } = await useSendBookingRequest({
						userId: userId,
						visitType: visitType,
						address: address,
						selectedBooking: selectedBooking,
						currentBookedDates: currentBookedDates,
						setIsError: setIsError,
						setIsSuccess: setIsSuccess,
						setErrorMessage: setErrorMessage,
						setCurrentBookedDates: setCurrentBookedDates,
					});

					await SendBookingRequest();
					// Must move inside SendBookingRequest
					// socket.emit('booking-request');
					setIsLoading(false);
					OnPressClose();
					setLoadingHeader('Loading...');
				},
			},
		]);
	};

	return (
		<Pressable className='h-full w-full items-center justify-center bg-gray-500/70 absolute z-[200]'>
			<View
				style={containerStyles.container}
				className='h-80 w-72 rounded p-2 bg-white'
			>
				<TouchableOpacity onPress={OnPressClose} className='w-7 items-center'>
					<Entypo name='cross' size={20} color='black' />
				</TouchableOpacity>
				<DialogVisitType
					visitType={visitType}
					SetVisitType={SetVisitType}
					OnChangeText={OnChangeText}
				/>
				<DialogAddressNote />
				<View className='flex-row w-full pt-8 gap-3 justify-end'>
					<View>
						<BookingDialogTouchableButton
							title='Cancel'
							styleClassName='h-12 bg-red-600 w-20 items-center justify-center rounded'
							onPress={OnPressClose}
						/>
					</View>
					<View>
						<BookingDialogTouchableButton
							title='OK'
							styleClassName='h-12 bg-green-600 w-20 items-center justify-center rounded'
							onPress={OnPressOK}
						/>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default BookingDialogRequest;
