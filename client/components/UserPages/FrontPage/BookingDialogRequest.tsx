import {
	View,
	Text,
	Pressable,
	TextInput,
	NativeSyntheticEvent,
	TextInputChangeEventData,
	Alert,
	TouchableOpacity,
} from 'react-native';
import containerStyles from '../../../styles/containerStyles';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { SendUsingBookingRequest } from '../../../services/UserPages/FrontPage/sendUsingBookingRequest';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import { COLORS as colorSet } from '../../../constants/theme';
import { useFetchId } from '../../../hooks/UserPages/FrontPage/useFetchId';

type BookingDialogRequestProps = {
	selectedBooking: string;
	dateDialogDisplay: string;
	setShow: (action: boolean) => void;
	setIsLoading: (action: boolean) => void;
	setIsError: (action: boolean) => void;
	setIsSuccess: (action: boolean) => void;
	setErrorMessage: (action: string) => void;
};

// TODO: will need a response back message
// SLOW

const BookingDialogRequest = ({
	selectedBooking,
	dateDialogDisplay,
	setShow,
	setIsLoading,
	setIsError,
	setIsSuccess,
	setErrorMessage,
}: BookingDialogRequestProps) => {
	const [address, setAddress] = useState<string | null>(null);
	const [visitType, setVisitType] = useState<string>('office');
	const DATE_ALREADY_BOOKED = 'Already Booked';
	const DATE_BOOKED_SUCCESSFUL = 'Successful';

	const { userId } = useFetchId();

	const SelectListData = [
		{ key: '1', value: 'office' },
		{ key: '2', value: 'home' },
	];

	const SetVisitType = (value: string) => {
		setVisitType(value);
	};

	const OnChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
		setAddress(e.nativeEvent.text);
	};

	const OnPressClose = () => {
		setShow(false);
	};

	const SendBookingRequest = async () => {
		setIsLoading(true);
		if (userId == null) {
			setErrorMessage('Id does not exist. Process system failed.');
			setIsError(true);
			return;
		}

		let response = await SendUsingBookingRequest({
			userId: parseInt(userId),
			address: address,
			locationType: visitType,
			date: moment.utc(selectedBooking).local().toDate(),
		});

		if (response === DATE_ALREADY_BOOKED) {
			setErrorMessage(
				'Date is already booked. Please try a different date and time.'
			);
			setIsError(true);
			OnPressClose();
			return;
		} else if (response === DATE_BOOKED_SUCCESSFUL) {
			setIsSuccess(true);
			OnPressClose();
			return;
		}

		setErrorMessage('Failed to process booking request. Please try again.');
		setIsError(true);
		return;
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
					await SendBookingRequest();
					setIsLoading(false);
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
				<View className='flex-col h-32 justify-between border-b-2 border-black p-1 pb-2'>
					<View className='flex-row h-10 items-center relative'>
						<Text className='text-base pl-[2px] font-semibold'>
							Select Visit Type:
						</Text>
						<View className='absolute z-50 right-0 top-0'>
							<SelectList
								setSelected={SetVisitType}
								data={SelectListData}
								placeholder='office'
								save='value'
								search={false}
								boxStyles={{ backgroundColor: colorSet.white }}
								dropdownStyles={{ backgroundColor: colorSet.white }}
							/>
						</View>
					</View>
					<View
						className={`flex-col items-start -z-10 ${
							visitType === 'office' ? 'hidden' : 'flex'
						}`}
					>
						<Text className='text-base font-semibold pb-1 pl-[2px]'>
							Address:
						</Text>
						<TextInput
							className='p-1 rounded-md bg-slate-100 border-2 border-gray-500/50 w-full'
							placeholder='Enter Address...'
							onChange={OnChangeText}
						/>
					</View>
				</View>
				<View className='py-2 border-b-2 border-black'>
					<Text className='text-red-600 font-semibold'>NB:</Text>
					<Text className='text-xs'>
						If visit type is home please fill in your address.
					</Text>
					<Text className='font-semibold text-xs'>
						Eg. 23 Crest View Rd Nahoon
					</Text>
				</View>
				<View className='flex-row w-full pt-8 gap-3 justify-end'>
					<TouchableOpacity
						className='h-12 bg-red-600 w-20 items-center justify-center rounded'
						onPress={OnPressClose}
					>
						<Text className='text-lg text-white font-semibold'>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={OnPressOK}
						className='h-12 bg-green-600 w-20 items-center justify-center rounded'
					>
						<Text className='text-lg text-white font-semibold'>OK</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Pressable>
	);
};

export default BookingDialogRequest;
