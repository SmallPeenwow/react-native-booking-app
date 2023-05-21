import { View, Text, TextInput, Keyboard } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import textStyles from '../styles/textStyles';

type DateOfBirthProps = {
	title: string;
	placeholder: string;
	dateSelected: Date;
	useStateChange: (active: Date) => void;
};

const DateOfBirth = ({
	title,
	placeholder,
	dateSelected,
	useStateChange,
}: DateOfBirthProps) => {
	const [show, setShow] = useState(false);

	const displayDatePicker = () => {
		setShow(!show);
	};

	const onDateChanged = (event: any, selectedDate: Date | undefined) => {
		displayDatePicker();

		if (selectedDate !== undefined && event.type !== 'dismissed') {
			useStateChange(
				new Date(
					selectedDate.getUTCFullYear(),
					selectedDate.getUTCMonth(),
					selectedDate.getUTCDate()
				)
			);
		}
	};

	return (
		<View className='gap-1 py-3'>
			<Text className={textStyles.default}>{title}</Text>
			<View className='flex-row'>
				<TextInput
					className='py-3 px-4 text-lg rounded-md bg-slate-100 border-2 border-gray-500 w-60'
					placeholder={placeholder}
					onPressOut={displayDatePicker}
					value={
						dateSelected.toLocaleDateString() != new Date().toLocaleDateString()
							? dateSelected.toLocaleDateString()
							: ''
					}
					onFocus={() => Keyboard.dismiss()}
				/>
			</View>
			{show && (
				<DateTimePicker
					value={dateSelected}
					mode={'date'}
					display='spinner'
					minimumDate={new Date(1900, 0, 1)}
					maximumDate={new Date()}
					onChange={onDateChanged}
				/>
			)}
		</View>
	);
};

export default DateOfBirth;