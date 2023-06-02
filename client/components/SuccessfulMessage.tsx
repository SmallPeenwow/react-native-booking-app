import { useEffect } from 'react';
import { View, Text } from 'react-native';

type SuccessfulMessageProps = {
	title: string;
	isSuccess: boolean;
	setIsSuccess: (action: boolean) => void;
};

const SuccessfulMessage = ({
	title,
	isSuccess,
	setIsSuccess,
}: SuccessfulMessageProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsSuccess(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, [isSuccess]);

	return (
		<View className='absolute items-center h-full z-50 top-1/4 w-full'>
			<View className='p-5 bg-main-color/80 w-3/4 rounded items-center'>
				<Text className='text-white text-lg font-semibold'>{title}</Text>
			</View>
		</View>
	);
};

export default SuccessfulMessage;
