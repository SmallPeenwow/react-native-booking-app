import { View, Text } from 'react-native';
import React from 'react';

type ErrorMessageProps = {
	message: string;
	isVisible: boolean;
	activeStateChange: (active: boolean) => void;
};

// Must accept in some values to be used
const ErrorMessage = ({
	message,
	isVisible,
	activeStateChange,
}: ErrorMessageProps) => {
	return (
		<View className='hidden'>
			<Text>ErrorMessage</Text>
		</View>
	);
};

export default ErrorMessage;
