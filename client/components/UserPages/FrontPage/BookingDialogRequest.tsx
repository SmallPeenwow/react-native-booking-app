import {
	View,
	Text,
	Pressable,
	TextInput,
	NativeSyntheticEvent,
	TextInputChangeEventData,
	Alert,
} from 'react-native';
import containerStyles from '../../../styles/containerStyles';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { sendUsingBookingRequest } from '../../../services/UserPages/FrontPage/sendUsingBookingRequest';
import moment from 'moment';

type BookingDialogRequestProps = {
	selectedBooking: string;
	dateDialogDisplay: string;
	userId: Promise<string | undefined>;
	setShow: (action: boolean) => void;
};

// TODO: Add small X on top right
// TODO: will need a response back message
// MAYBE: Swap put pressable for touchableopacity for buttons

const BookingDialogRequest = ({
	selectedBooking,
	dateDialogDisplay,
	userId,
	setShow,
}: BookingDialogRequestProps) => {
	const [address, setAddress] = useState<string | null>(null);
	const [visitType, setVisitType] = useState<string>('office');
	const [id, setId] = useState<string>();

	userId.then((data: string | undefined) => {
		setId(data);
	});

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

	// NOT working as it should as the center container also closers it
	const OnPressOpenSpace = () => {
		setShow(false);
	};

	//console.log(new Date(dateTime), 'here'); // This works too
	const OnPressOK = () => {
		console.log(selectedBooking);
		let d = moment.utc(selectedBooking).local();
		console.log(d.toDate(), ' herhererer');
		if (id === undefined) {
			// TODO: error message later
			return;
		}

		Alert.alert(dateDialogDisplay, 'Do you want to book this day and time?', [
			{
				text: 'No',
				onPress: () => {},
				style: 'cancel',
			},
			{
				text: 'Yes',
				onPress: async () => {
					let v = await sendUsingBookingRequest({
						userId: parseInt(id),
						address: address,
						locationType: visitType,
						date: moment.utc(selectedBooking).local().toDate(),
					});

					console.log(v);
				},
			},
		]);
	};

	return (
		<Pressable
			// onPress={OnPressOpenSpace}
			className='h-full w-full items-center justify-center bg-gray-500/70 absolute z-[200]'
		>
			<View
				style={containerStyles.container}
				className='h-80 w-72 rounded p-2 bg-white'
			>
				<View className='flex-col h-36 justify-between border-b-2 border-black p-1 pb-2'>
					<View className='flex-row h-10 items-center relative'>
						<Text className='text-base font-semibold'>Select Visit Type:</Text>
						<View className='absolute z-50 right-0 top-0'>
							<SelectList
								setSelected={SetVisitType}
								data={SelectListData}
								placeholder='office'
								save='value'
								search={false}
								boxStyles={{ backgroundColor: 'white' }}
								dropdownStyles={{ backgroundColor: 'white' }}
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
							className='p-2 rounded-md bg-slate-100 border-2 border-gray-500/50 w-full'
							placeholder='Enter Address...'
							onChange={OnChangeText}
						/>
					</View>
				</View>
				<View className='flex-row w-full py-5 items-center gap-2 justify-end'>
					<Pressable
						className='h-12 bg-red-600 w-20 items-center justify-center rounded'
						onPress={OnPressOpenSpace}
					>
						<Text className='text-lg text-white font-semibold'>Cancel</Text>
					</Pressable>
					<Pressable
						onPress={OnPressOK}
						className='h-12 bg-green-600 w-20 items-center justify-center rounded'
					>
						<Text className='text-lg text-white font-semibold'>OK</Text>
					</Pressable>
				</View>
			</View>
		</Pressable>
	);
};

export default BookingDialogRequest;
