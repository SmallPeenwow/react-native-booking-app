import { View, Text } from 'react-native';
import React from 'react';
import DatePicker from 'react-native-datepicker';
import textStyles from '../styles/textStyles';

type DateOfBirthProps = {
	title: string;
	placeholder: string;
	useStateChange: (active: string) => void;
};

const DateOfBirth = ({
	title,
	placeholder,
	useStateChange,
}: DateOfBirthProps) => {
	const onDateChanged = (e: any) => {
		useStateChange(e.target.value);
	};

	return (
		<View>
			<Text className={textStyles.default}>{title}</Text>
			<DatePicker
				date={''}
				placeholder={placeholder}
				format='DD/MM/YYYY'
				minDate='01-01-1900'
				confirmBtnText='OK'
				cancelBtnText='Cancel'
				onDateChange={onDateChanged}
			/>
		</View>
	);
};

export default DateOfBirth;
