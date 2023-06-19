import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

type BookingDialogTouchableButtonProps = {
	title: string;
	styleClassName: string;
	onPress: () => void;
};

const BookingDialogTouchableButton = ({
	title,
	styleClassName,
	onPress,
}: BookingDialogTouchableButtonProps) => {
	return (
		<TouchableOpacity className={styleClassName} onPress={onPress}>
			<Text className='text-lg text-white font-semibold'>{title}</Text>
		</TouchableOpacity>
	);
};

export default BookingDialogTouchableButton;
