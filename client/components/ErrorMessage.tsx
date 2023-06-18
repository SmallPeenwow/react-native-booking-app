import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

type ErrorMessageProps = {
	message: string;
	isError: boolean;
	activeStateChange: (active: boolean) => void;
};

const ErrorMessage = ({
	message,
	isError,
	activeStateChange,
}: ErrorMessageProps) => {
	// Runs multiply times fix me
	useEffect(() => {
		const timer = setTimeout(() => {
			activeStateChange(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, [isError]);

	return (
		<View className='bg-gray-700/90 w-72 break-words p-3 items-center rounded'>
			<Text className='text-xl text-white'>{message}</Text>
		</View>
	);
};

export default ErrorMessage;
